#!/bin/zsh
STORAGE_ZONE="queenie-works"
STORAGE_PASSWORD="941842cc-9eee-49f8-9073ec40ef5f-895d-4f5b"
STORAGE_HOST="ny.storage.bunnycdn.com"
CDN_HOST="queenie-works-images.b-cdn.net"
TMPDIR_IMG="/tmp/bunny-img-upload"

mkdir -p "$TMPDIR_IMG"

IMAGES=(
"keychallenges_gbcpmt.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775145412/keychallenges_gbcpmt.png"
"Screen-Shot-2023-09-09-at-5.05.05-PM_fbjata.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150814/Screen-Shot-2023-09-09-at-5.05.05-PM_fbjata.png"
"Screen-Shot-2023-09-09-at-5.06.34-PM_yozcnt.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150814/Screen-Shot-2023-09-09-at-5.06.34-PM_yozcnt.png"
"Queenie-15_qlkif2.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Queenie-15_qlkif2.jpg"
"Queenie-16_t20ysa.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Queenie-16_t20ysa.jpg"
"Queenie-17_iblugt.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Queenie-17_iblugt.jpg"
"Screen-Shot-2023-09-09-at-4.17.46-PM_ojywvp.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-4.17.46-PM_ojywvp.png"
"Screen-Shot-2023-09-09-at-5.03.54-PM_nfquy7.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-5.03.54-PM_nfquy7.png"
"Screen-Shot-2023-09-09-at-5.07.04-PM_kq9xdl.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-5.07.04-PM_kq9xdl.png"
"Screen-Shot-2023-09-09-at-5.07.22-PM_rxdb6z.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-5.07.22-PM_rxdb6z.png"
"XDwxKav2yVqvQ7VDBueuNb3ChHM-1_xk1qed.avif|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/XDwxKav2yVqvQ7VDBueuNb3ChHM-1_xk1qed.avif"
"Queenie-11_l2tz1q.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Queenie-11_l2tz1q.jpg"
"Queenie-20_cbejv0.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Queenie-20_cbejv0.jpg"
"Queenie-4_nujlbw.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Queenie-4_nujlbw.jpg"
"Screen-Shot-2023-09-09-at-4.23.52-PM_cekxvu.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-4.23.52-PM_cekxvu.png"
"Screen-Shot-2023-09-09-at-5.01.57-PM_bbwqi5.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.01.57-PM_bbwqi5.png"
"Screen-Shot-2023-09-09-at-5.02.09-PM_cixkbv.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.02.09-PM_cixkbv.png"
"Screen-Shot-2023-09-09-at-5.03.30-PM_i9o4ox.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.03.30-PM_i9o4ox.png"
"Screen-Shot-2023-09-09-at-5.03.39-PM_x20lbz.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.03.39-PM_x20lbz.png"
"Screen-Shot-2023-09-09-at-5.05.25-PM_il5jjw.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.05.25-PM_il5jjw.png"
"Screen-Shot-2023-09-13-at-3.09.58-PM_bzv3d0.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-13-at-3.09.58-PM_bzv3d0.png"
"zlI1FG63ZYMutiV532ToTlBVD4A-1_ze5bt0.avif|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/zlI1FG63ZYMutiV532ToTlBVD4A-1_ze5bt0.avif"
"Queenie-18_ekox40.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Queenie-18_ekox40.jpg"
"Queenie-19_riuidp.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Queenie-19_riuidp.jpg"
"Queenie-21_avosam.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Queenie-21_avosam.jpg"
"Screen-Shot-2023-09-09-at-5.03.08-PM_jsceon.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.03.08-PM_jsceon.png"
"Screen-Shot-2023-09-09-at-5.06.13-PM_kzgqx4.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.06.13-PM_kzgqx4.png"
"Screen-Shot-2023-09-09-at-5.06.48-PM_ftgdas.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.06.48-PM_ftgdas.png"
"Screen-Shot-2023-09-09-at-5.06.56-PM_h4cgvy.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.06.56-PM_h4cgvy.png"
"Screen-Shot-2023-09-17-at-4.19.31-PM_peswut.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-17-at-4.19.31-PM_peswut.png"
"Screen-Shot-2023-09-17-at-4.19.42-PM_l1pckp.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-17-at-4.19.42-PM_l1pckp.png"
"Screen-Shot-2023-09-17-at-4.42.07-PM_ib1rxj.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-17-at-4.42.07-PM_ib1rxj.png"
"Screen-Shot-2023-09-09-at-5.01.48-PM_bs5eyi.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.01.48-PM_bs5eyi.png"
"Screen-Shot-2023-09-09-at-5.03.16-PM_ompnuo.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.03.16-PM_ompnuo.png"
"Screen-Shot-2023-09-09-at-5.04.04-PM_tktw34.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.04.04-PM_tktw34.png"
"Screen-Shot-2023-09-09-at-5.04.18-PM_bpb8jp.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.04.18-PM_bpb8jp.png"
"Screen-Shot-2023-09-09-at-5.05.55-PM_ouunhu.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.05.55-PM_ouunhu.png"
"Screen-Shot-2023-09-11-at-3.59.41-PM_gsn6yu.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-11-at-3.59.41-PM_gsn6yu.png"
"Screen-Shot-2023-09-17-at-4.41.51-PM_umdl3j.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-17-at-4.41.51-PM_umdl3j.png"
"cPUhWtzYlRfwnqOqqeIYhN9Pas-1_arsvuc.avif|https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/cPUhWtzYlRfwnqOqqeIYhN9Pas-1_arsvuc.avif"
"23_p3q9ci.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775151167/23_p3q9ci.png"
"all-artboard-4_qh8rfz.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775151167/all-artboard-4_qh8rfz.png"
"untitled-4_okpedv.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775151168/untitled-4_okpedv.png"
"ux_lcyddc.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775151169/ux_lcyddc.png"
"first-day_tzrxmp.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775165345/first-day_tzrxmp.jpg"
"team-breakfast_pqqfvw.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775165345/team-breakfast_pqqfvw.jpg"
"tech-social_rek0gh.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775165345/tech-social_rek0gh.jpg"
"2_gxkkgu.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775165498/2_gxkkgu.png"
"5_jftcuc.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775165498/5_jftcuc.png"
"dandi_earring_ynqooo.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775169548/dandi_earring_ynqooo.png"
"portrait_mptbin.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775178157/portrait_mptbin.jpg"
"taipei_iksdsk.jpg|https://res.cloudinary.com/dugdaifzh/image/upload/v1775178157/taipei_iksdsk.jpg"
"about_jo8ete.png|https://res.cloudinary.com/dugdaifzh/image/upload/v1775178168/about_jo8ete.png"
)

TOTAL=${#IMAGES[@]}
OK=0
FAIL=0

for i in {1..$TOTAL}; do
  PAIR="${IMAGES[$i]}"
  FILENAME="${PAIR%%|*}"
  URL="${PAIR#*|}"

  printf "[%d/%d] %s... " "$i" "$TOTAL" "$FILENAME"

  # Download from Cloudinary
  HTTP_DL=$(curl -s -o "$TMPDIR_IMG/$FILENAME" -w "%{http_code}" "$URL")
  if [ "$HTTP_DL" != "200" ]; then
    echo "DOWNLOAD FAILED (HTTP $HTTP_DL)"
    FAIL=$((FAIL + 1))
    continue
  fi

  # Upload to Bunny Storage
  HTTP_UP=$(curl -s -o /dev/null -w "%{http_code}" --request PUT \
    --url "https://${STORAGE_HOST}/${STORAGE_ZONE}/${FILENAME}" \
    --header "AccessKey: ${STORAGE_PASSWORD}" \
    --header "content-type: application/octet-stream" \
    --data-binary "@${TMPDIR_IMG}/${FILENAME}")

  if [ "$HTTP_UP" = "201" ]; then
    echo "OK"
    OK=$((OK + 1))
  else
    echo "UPLOAD FAILED (HTTP $HTTP_UP)"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "Done! $OK uploaded, $FAIL failed."
rm -rf "$TMPDIR_IMG"
