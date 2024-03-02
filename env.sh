template=".env_template"
envfile=".env"

if [ ! -s "$envfile" ]; then
  cp "$template" "$envfile" && echo "Copied $template to $envfile"
else
  echo "$envfile already exists or is not empty. No action taken."
fi
