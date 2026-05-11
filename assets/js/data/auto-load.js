---
layout: compress
permalink: '/:path/auto-load.js'
---

/**
 * Auto-load MathJax and Mermaid based on content detection
 * Automatically detects if the article contains math formulas or flowcharts
 * and loads the corresponding libraries from CDN only when needed.
 */

(function() {
  'use strict';

  const article = document.querySelector('article');
  if (!article) return;

  const content = article.textContent;

  // Detect MathJax: $...$, $$...$$, \(...\), \[...\], \begin{...}
  const hasMathJax = /\$\$|\$[^$]+\$|\\\(|\\\[|\\begin\{/.test(content);

  // Detect Mermaid: code blocks with class 'language-mermaid'
  const hasMermaid = document.querySelector('.language-mermaid') !== null;

  // Load MathJax from CDN if needed
  if (hasMathJax) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.defer = true;
    script.async = true;
    
    // Configure MathJax before loading
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        tags: 'ams'
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    };
    
    document.head.appendChild(script);
    console.log('[Auto-Load] MathJax loaded from CDN');
  }

  // Load Mermaid from CDN if needed
  if (hasMermaid) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    script.defer = true;
    script.async = true;
    
    // Initialize Mermaid after loading
    script.onload = function() {
      // Detect theme (light or dark)
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      mermaid.initialize({
        startOnLoad: true,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose'
      });
      
      console.log('[Auto-Load] Mermaid initialized with theme:', isDark ? 'dark' : 'default');
    };
    
    document.head.appendChild(script);
    console.log('[Auto-Load] Mermaid loaded from CDN');
  }

  // Log detection results
  if (!hasMathJax && !hasMermaid) {
    console.log('[Auto-Load] No MathJax or Mermaid detected, skipping library loading');
  }
})();
