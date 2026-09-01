// ============================================================
// Lightweight markdown viewer for docs.html
// Renders repo markdown files as readable pages instead of raw text.
// Vanilla JS, no dependencies - matches the rest of this project.
// ============================================================

(function() {
    'use strict';

    // Only these content directories are servable through the viewer -
    // deliberately excludes root-level files like CLAUDE.md/AGENTS.md.
    const ALLOWED_PATTERN = /^(docs|domains|artifacts|resources|quiz)\/[A-Za-z0-9_-]+\.md$/;

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function renderInline(rawText) {
        const codeSpans = [];
        let text = rawText.replace(/`([^`]+)`/g, function(m, code) {
            codeSpans.push(escapeHtml(code));
            return '@@CODE' + (codeSpans.length - 1) + '@@';
        });
        text = escapeHtml(text);
        text = text.replace(/@@CODE(\d+)@@/g, function(m, i) {
            return '<code>' + codeSpans[Number(i)] + '</code>';
        });
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, label, url) {
            const external = /^https?:\/\//.test(url);
            return '<a href="' + url + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
        });
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
        return text;
    }

    function isTableSeparator(line) {
        return /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);
    }

    function splitRow(line) {
        let l = line.trim();
        if (l.charAt(0) === '|') l = l.slice(1);
        if (l.charAt(l.length - 1) === '|') l = l.slice(0, -1);
        return l.split('|').map(function(c) { return c.trim(); });
    }

    function calloutClass(text) {
        if (text.indexOf('⚠') !== -1) return 'callout callout--warning';
        if (text.indexOf('💡') !== -1 || text.indexOf('🎯') !== -1) return 'callout callout--accent';
        return 'callout callout--soft';
    }

    function isBlockStartLine(line) {
        const trimmed = line.trim();
        return /^BLOCK\d+$/.test(trimmed) ||
            /^(#{1,4})\s+/.test(line) ||
            /^(---+|\*\*\*+|___+)\s*$/.test(trimmed) ||
            /^>\s?/.test(line) ||
            /^\s*[-*]\s+/.test(line) ||
            /^\s*\d+\.\s+/.test(line) ||
            line.indexOf('|') !== -1;
    }

    function parseMarkdown(md) {
        md = md.replace(/\r\n?/g, '\n'); // normalise CRLF/CR - many repo files are Windows line-ended
        const codeBlocks = [];
        md = md.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, function(m, code) {
            codeBlocks.push(code.replace(/\n$/, ''));
            return '\nBLOCK' + (codeBlocks.length - 1) + '\n';
        });

        const lines = md.split('\n');
        let html = '';
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            if (trimmed === '') { i++; continue; }

            const blockMatch = trimmed.match(/^BLOCK(\d+)$/);
            if (blockMatch) {
                html += '<pre><code>' + escapeHtml(codeBlocks[Number(blockMatch[1])]) + '</code></pre>\n';
                i++; continue;
            }

            if (/^(---+|\*\*\*+|___+)\s*$/.test(trimmed)) {
                html += '<hr class="sheet-divider">\n';
                i++; continue;
            }

            const headerMatch = line.match(/^(#{1,4})\s+(.*)$/);
            if (headerMatch) {
                const level = headerMatch[1].length;
                html += '<h' + level + '>' + renderInline(headerMatch[2].trim()) + '</h' + level + '>\n';
                i++; continue;
            }

            if (line.indexOf('|') !== -1 && lines[i + 1] && isTableSeparator(lines[i + 1])) {
                const headerCells = splitRow(line);
                i += 2;
                const rows = [];
                while (i < lines.length && lines[i].indexOf('|') !== -1 && lines[i].trim() !== '') {
                    rows.push(splitRow(lines[i]));
                    i++;
                }
                html += '<div class="table-scroll"><table class="table-standard"><thead><tr>';
                headerCells.forEach(function(c) { html += '<th>' + renderInline(c) + '</th>'; });
                html += '</tr></thead><tbody>';
                rows.forEach(function(r) {
                    html += '<tr>';
                    r.forEach(function(c) { html += '<td>' + renderInline(c) + '</td>'; });
                    html += '</tr>';
                });
                html += '</tbody></table></div>\n';
                continue;
            }

            if (/^>\s?/.test(line)) {
                const quoteLines = [];
                while (i < lines.length && /^>\s?/.test(lines[i])) {
                    quoteLines.push(lines[i].replace(/^>\s?/, ''));
                    i++;
                }
                const text = quoteLines.join(' ');
                html += '<div class="' + calloutClass(text) + '"><p>' + renderInline(text) + '</p></div>\n';
                continue;
            }

            if (/^\s*[-*]\s+/.test(line)) {
                const items = [];
                while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
                    items.push(renderInline(lines[i].replace(/^\s*[-*]\s+/, '')));
                    i++;
                }
                html += '<ul>' + items.map(function(it) { return '<li>' + it + '</li>'; }).join('') + '</ul>\n';
                continue;
            }

            if (/^\s*\d+\.\s+/.test(line)) {
                const items = [];
                while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
                    items.push(renderInline(lines[i].replace(/^\s*\d+\.\s+/, '')));
                    i++;
                }
                html += '<ol>' + items.map(function(it) { return '<li>' + it + '</li>'; }).join('') + '</ol>\n';
                continue;
            }

            const paraLines = [line];
            i++;
            while (i < lines.length && lines[i].trim() !== '' && !isBlockStartLine(lines[i])) {
                paraLines.push(lines[i]);
                i++;
            }
            html += '<p>' + renderInline(paraLines.join(' ')) + '</p>\n';
        }

        return html;
    }

    document.addEventListener('DOMContentLoaded', function() {
        const params = new URLSearchParams(location.search);
        const file = params.get('file') || '';
        const titleEl = document.getElementById('docTitle');
        const contentEl = document.getElementById('docContent');
        const rawLink = document.getElementById('docRawLink');

        if (!ALLOWED_PATTERN.test(file)) {
            contentEl.innerHTML = '<div class="doc-error"><h2>Document not found</h2><p>This link doesn\'t point to a valid study document.</p></div>';
            titleEl.textContent = 'Not found';
            if (rawLink) rawLink.hidden = true;
            return;
        }

        if (rawLink) rawLink.href = file;

        fetch(file)
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function(text) {
                contentEl.innerHTML = parseMarkdown(text);
                const h1 = contentEl.querySelector('h1');
                const title = h1 ? h1.textContent : file.split('/').pop().replace(/\.md$/, '');
                titleEl.textContent = title;
                document.title = title + ' · SAP EA Certification Workspace';
            })
            .catch(function(err) {
                contentEl.innerHTML = '<div class="doc-error"><h2>Couldn\'t load this document</h2><p>' + escapeHtml(err.message) + '</p></div>';
                titleEl.textContent = 'Error';
            });
    });
})();
