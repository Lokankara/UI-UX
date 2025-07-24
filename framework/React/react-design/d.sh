repo="LinkedInLearning/react-design-patterns-2895130"
mkdir -p downloads
git ls-remote --heads "https://github.com/${repo}.git" | awk '{print $2}' | sed 's#refs/heads/##' | while IFS= read -r branch; do
  safe=$(echo "$branch" | tr '/' '-')
  curl -L -sS -o "downloads/${safe}.zip" "https://github.com/${repo}/archive/refs/heads/${branch}.zip"
done
