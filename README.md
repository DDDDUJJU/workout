# Workout

GitHub Pages workout tracker. The app records weight only (no repetitions), includes expandable exercise photos and cues for strength work, and automatically commits the compressed `training-data.gz` after all of today's exercises are marked complete and every strength exercise has a weight.

## One-time connection

Open the deployed site and enter a GitHub fine-grained personal access token once in **GitHub 连接**. Limit it to this repository and grant only **Contents: Read and write**. The token stays in that browser's local storage and is never included in the repository or deployed page source. Previous scattered local keys are merged into a single state record and removed automatically; the old uncompressed cloud file is deleted after the first successful compressed sync.
