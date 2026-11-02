const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.join(__dirname, '..', '_site');
const origin = 'https://blog.devcito.org';
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const pageFor = (url) => {
  const pathname = new URL(url).pathname;
  return read(pathname === '/' ? 'index.html' : path.join(decodeURIComponent(pathname), 'index.html'));
};
const meta = (html, attribute, name) => {
  const tag = html.match(new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="([^"]*)"`, 'i'));
  return tag && tag[1];
};
const structuredData = (html) => {
  const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  return script ? JSON.parse(script[1]) : null;
};

test('sitemap contains canonical, indexable pages and all linked posts', () => {
  const sitemap = read('sitemap.xml');
  const urls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
  assert.ok(urls.includes(`${origin}/`));
  assert.ok(urls.includes(`${origin}/archive/`));
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(!urls.some((url) => /\/(?:404\.html|about\/)/.test(url)));

  const home = read('index.html');
  const postUrls = Array.from(home.matchAll(/class="explorer-link explorer-post[^"]*" href="([^"]+)"/g), (match) => origin + match[1]);
  assert.ok(postUrls.length > 0);
  for (const url of postUrls) assert.ok(urls.includes(url), `${url} is missing from sitemap`);

  for (const url of urls) {
    assert.ok(url.startsWith(`${origin}/`));
    const html = pageFor(url);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`), url);
    assert.equal(meta(html, 'name', 'robots'), 'index, follow');
    assert.ok(meta(html, 'name', 'description'), url);
  }
});

test('robots and excluded pages are configured consistently', () => {
  assert.match(read('robots.txt'), new RegExp(`Sitemap: ${origin}/sitemap\\.xml`));
  assert.equal(meta(read('404.html'), 'name', 'robots'), 'noindex, follow');
  assert.equal(meta(read('about/index.html'), 'name', 'robots'), 'noindex, follow');
});

test('home and article social metadata and JSON-LD use public URLs', () => {
  const home = read('index.html');
  assert.match(home, /<title>devcito blog \| Desarrollo de software, código y proyectos<\/title>/);
  assert.equal(structuredData(home)['@type'], 'WebSite');
  assert.equal(meta(home, 'property', 'og:url'), `${origin}/`);

  const article = read('el-algoritmo-de-colores-de-armonic-themes/index.html');
  const json = structuredData(article);
  assert.equal(json['@type'], 'BlogPosting');
  assert.equal(json.url, `${origin}/el-algoritmo-de-colores-de-armonic-themes/`);
  assert.equal(json.author.name, 'devcito');
  assert.ok(json.datePublished);
  assert.equal(meta(article, 'property', 'og:image'), json.image);
  assert.ok(meta(article, 'property', 'og:image:alt'));
  assert.equal(meta(article, 'name', 'twitter:card'), 'summary_large_image');
  assert.ok(fs.existsSync(path.join(root, new URL(json.image).pathname)));

  const english = read('validacion-maestro-detalle-con-tokens-para-seguridad/index.html');
  assert.match(english, /<html lang="en">/);
  assert.equal(structuredData(english).inLanguage, 'en');
});
