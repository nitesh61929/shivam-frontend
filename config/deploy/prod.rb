server '165.22.106.174',
user: 'deploy',
roles: %w{web app},
port: 22

# Directory to deploy
# ===================
set :env, 'prod'
set :app_debug, 'true'
set :app_dir_name, 'shivam'
set :deploy_to, '/home/deploy/shivam/shivam-frontend'
set :shared_path, '/home/deploy/shivam/shivam-frontend/shared'
set :tmp_dir, '/home/deploy/shivam/temp'
set :site_url, '165.22.106.174'
