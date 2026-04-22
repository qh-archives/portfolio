#!/bin/zsh
API_KEY="76882e81-3d55-4e1e-82b3c5e4e560-16a9-4473"
LIBRARY_ID="642516"
CSV_FILE="bunny-upload-map.csv"

echo "filename,guid,title" > "$CSV_FILE"

PAIRS=(
"Test_oh08am|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145366/Test_oh08am.mp4"
"7_jpicnc|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145368/7_jpicnc.mp4"
"8_eg3gps|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145368/8_eg3gps.mp4"
"3_pwkyji|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145369/3_pwkyji.mp4"
"5_rrdttw|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145369/5_rrdttw.mp4"
"6_mc7xue|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145369/6_mc7xue.mp4"
"2_ofieiu|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145370/2_ofieiu.mp4"
"19_znhiyb|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145371/19_znhiyb.mp4"
"16_ohcl1b|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145372/16_ohcl1b.mp4"
"14_lph1c8|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145374/14_lph1c8.mp4"
"11_mxznsj|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145375/11_mxznsj.mp4"
"12_zf6ihe|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145375/12_zf6ihe.mp4"
"17_aoumzl|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145375/17_aoumzl.mp4"
"10_iwrmro|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145376/10_iwrmro.mp4"
"9_fhfxw8|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145377/9_fhfxw8.mp4"
"13_v7k9yo|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145379/13_v7k9yo.mp4"
"track_lscvkf|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145379/track_lscvkf.mp4"
"share_qkgfln|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145392/share_qkgfln.mp4"
"community_vclcws|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145396/community_vclcws.mp4"
"realtime-data_lxx93f|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145397/realtime-data_lxx93f.mp4"
"FlowfiPersonalizeRisk_lcbd0w|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145412/FlowfiPersonalizeRisk_lcbd0w.mp4"
"AIOptimizedFlowfi_v3m7ee|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145415/AIOptimizedFlowfi_v3m7ee.mp4"
"Flowfi_1_sfj20o|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145415/Flowfi_1_sfj20o.mp4"
"FlowfiOnboarding_rzgsgl|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145416/FlowfiOnboarding_rzgsgl.mp4"
"uberfinal_qmqq7l|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145421/uberfinal_qmqq7l.mp4"
"vid_d8zz1c|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145421/vid_d8zz1c.mp4"
"slow-final_eblntl|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145424/slow-final_eblntl.mp4"
"insights_oyq156|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145432/insights_oyq156.mp4"
"moodboard_u5ts0q|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145436/moodboard_u5ts0q.mp4"
"post_vhzfwl|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145439/post_vhzfwl.mp4"
"style-tags_shj4sm|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145443/style-tags_shj4sm.mp4"
"hero_ht0jkz|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145445/hero_ht0jkz.mp4"
"flowfi_xv31eg|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145461/flowfi_xv31eg.mp4"
"hands_nnhfnf|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145464/hands_nnhfnf.mp4"
"project-4_wmxpf4|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145464/project-4_wmxpf4.mp4"
"gravity_kruj0k|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145465/gravity_kruj0k.mp4"
"inspo_xyejpx|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145470/inspo_xyejpx.mp4"
"lume-card_sftzqm|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145474/lume-card_sftzqm.mp4"
"hero_ty418e|https://res.cloudinary.com/dugdaifzh/video/upload/v1775146464/hero_ty418e.mp4"
"1_vty7jm|https://res.cloudinary.com/dugdaifzh/video/upload/v1775146692/1_vty7jm.mp4"
"comp-1_sotpdc|https://res.cloudinary.com/dugdaifzh/video/upload/v1775151168/comp-1_sotpdc.mp4"
"1_bb3qni|https://res.cloudinary.com/dugdaifzh/video/upload/v1775145378/1_bb3qni.mp4"
"connect_2_pgqu3m|https://res.cloudinary.com/dugdaifzh/video/upload/v1775169999/connect_2_pgqu3m.mp4"
)

TOTAL=${#PAIRS[@]}
OK=0
FAIL=0

for i in {1..$TOTAL}; do
  PAIR="${PAIRS[$i]}"
  NAME="${PAIR%%|*}"
  URL="${PAIR#*|}"

  printf "[%d/%d] Fetching %s... " "$i" "$TOTAL" "$NAME"

  RESP=$(curl -s --request POST \
    --url "https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/fetch" \
    --header "AccessKey: ${API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json" \
    --data "{\"url\": \"${URL}\"}")

  GUID=$(echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id',''))" 2>/dev/null)
  SUCCESS=$(echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success',''))" 2>/dev/null)

  if [ "$SUCCESS" = "True" ] && [ -n "$GUID" ]; then
    echo "OK → $GUID"
    echo "${NAME}.mp4,${GUID},${NAME}" >> "$CSV_FILE"
    OK=$((OK + 1))
  else
    echo "ERROR: $RESP"
    FAIL=$((FAIL + 1))
  fi
  sleep 0.3
done

echo ""
echo "Done! $OK fetched, $FAIL errors."
echo "CSV written to $CSV_FILE"
