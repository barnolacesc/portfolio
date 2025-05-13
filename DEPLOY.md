# Deployment Guide

## GitHub Pages Deployment

### Initial Setup

1. **Create a GitHub Repository**
   - Go to your GitHub account and create a new repository
   - Name it `cv` if you want it to be available at `https://[username].github.io/cv/`
   - Or name it `[username].github.io` for it to be your main GitHub Pages site

2. **Initialize Git in your local repository**
   ```bash
   cd /path/to/your/cv/project
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Connect your local repository to GitHub**
   ```bash
   git remote add origin https://github.com/[username]/cv.git
   git push -u origin main
   ```

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. Your site will be published at the URL shown in the GitHub Pages section

### Using a Custom Domain (Optional)

1. **Purchase a domain** from any domain registrar (Namecheap, GoDaddy, etc.)

2. **Configure DNS settings at your domain provider**:
   - Add an A record pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a CNAME record pointing to `[username].github.io` if using a subdomain

3. **Update the CNAME file** in your repository:
   - Edit the CNAME file in the root of your repository
   - Remove the comment and add your domain name
   - For example: `cv.francescbarnola.com`

4. **Configure GitHub Pages to use your custom domain**:
   - Go to your repository settings
   - In the GitHub Pages section, enter your custom domain
   - Save the changes
   - Check "Enforce HTTPS" for secure connections

## Updating Your Website

### Manual Updates

1. Make changes to your local files
2. Test locally by opening `index.html` in your browser
3. Commit and push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```

### Using the Update Script

1. Run the update script:
   ```bash
   ./update.sh
   ```
2. Choose option 1 to push changes to GitHub
3. Enter a commit message when prompted

## Common Maintenance Tasks

### Updating Your CV PDF

1. Option 1: Use the update script and select option 2
2. Option 2: Manually replace the file at `assets/francesc_barnola_cv.pdf`

### Updating Your Profile Photo

1. Option 1: Use the update script and select option 3
2. Option 2: Manually replace the file at `assets/profile.jpg`

## Troubleshooting

### Site Not Updating

If your site doesn't reflect recent changes:
1. Check if the GitHub Pages build was successful in your repository's "Actions" tab
2. Wait a few minutes for changes to propagate
3. Try clearing your browser cache

### Custom Domain Issues

If your custom domain is not working:
1. Verify DNS settings with your domain provider
2. Ensure the CNAME file has the correct domain name
3. Check the GitHub Pages settings in your repository 