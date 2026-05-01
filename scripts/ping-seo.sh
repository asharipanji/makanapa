#!/usr/bin/env bash
# ============================================================
# MakanApa — SEO ping script
# Submit URLs ke search engines via IndexNow protocol
# (Bing, Yandex, Naver, Seznam — relayed ke jaringan IndexNow)
# ============================================================

set -euo pipefail

HOST="makanapa.lol"
KEY="0269bc516215cf1994baa1a0f95ccd71"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# URL list — tambah di sini kalau ada page baru
URLS=(
  "https://${HOST}/"
  "https://${HOST}/llms.txt"
  "https://${HOST}/llms-full.txt"
  "https://${HOST}/sitemap.xml"
)

# Build JSON urlList
URL_JSON=$(printf '"%s",' "${URLS[@]}")
URL_JSON="[${URL_JSON%,}]"

PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${URL_JSON}
}
EOF
)

echo "📤 Submitting ${#URLS[@]} URLs to IndexNow..."
echo

# IndexNow main endpoint (api.indexnow.org relay)
HTTP_INDEXNOW=$(curl -s -o /tmp/indexnow.out -w "%{http_code}" \
  -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")
echo "  api.indexnow.org → HTTP ${HTTP_INDEXNOW}"

# Bing direct
HTTP_BING=$(curl -s -o /tmp/bing.out -w "%{http_code}" \
  -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")
echo "  www.bing.com    → HTTP ${HTTP_BING}"

# Yandex direct
HTTP_YANDEX=$(curl -s -o /tmp/yandex.out -w "%{http_code}" \
  -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")
echo "  yandex.com      → HTTP ${HTTP_YANDEX}"

echo
if [[ "${HTTP_INDEXNOW}" == "200" || "${HTTP_INDEXNOW}" == "202" ]]; then
  echo "✅ IndexNow submission accepted (status ${HTTP_INDEXNOW})"
else
  echo "⚠️  IndexNow returned ${HTTP_INDEXNOW}"
  echo "    Response:"
  cat /tmp/indexnow.out
  echo
fi

echo
echo "ℹ️  Untuk Google: submit sitemap manual di Search Console"
echo "    https://search.google.com/search-console"
echo "    Add property → https://makanapa.lol → submit sitemap.xml"
echo
echo "ℹ️  Untuk Bing: claim site di Webmaster Tools (otomatis lewat IndexNow)"
echo "    https://www.bing.com/webmasters"
