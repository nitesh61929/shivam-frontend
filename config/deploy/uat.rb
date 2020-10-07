server '165.22.106.174',
user: 'deploy',
roles: %w{web app},
port: 22

# Directory to deploy
# ===================
set :env, 'uat'
set :app_debug, 'true'
set :app_dir_name, 'shivam-uat'
set :deploy_to, '/home/deploy/shivam-uat/shivam-frontend'
set :shared_path, '/home/deploy/shivam-uat/shivam-frontend/shared'
set :tmp_dir, '/home/deploy/shivam-uat/temp'
set :site_url, '165.22.106.174'
