template=".env_template"
envfile=".env"

generate_secret_key() {
    python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key();"
}

if [ ! -s "$envfile" ]; then
  if cp "$template" "$envfile" && echo "Copied $template to $envfile"; then
    secret_key=$(generate_secret_key)
    sed -i "s/SECRET_KEY='GET_DATA'/SECRET_KEY='$secret_key'/" "$envfile" && echo "Added SECRET_KEY to $envfile"
  fi
else
  echo "$envfile already exists or is not empty. No action taken."
fi
