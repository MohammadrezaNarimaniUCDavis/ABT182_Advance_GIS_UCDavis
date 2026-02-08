# Custom Domain Setup - UC Davis Hosting

## What We Did

✅ **Created CNAME file** in `public/CNAME` with content: `geoailab.ucdavis.edu`  
✅ **Updated deployment workflow** to use root path (`/`) when custom domain is configured  
✅ **Configured repository** for custom domain deployment

## Current Setup

- **GitHub Repository:** MohammadrezaNarimaniUCDavis/ABT182_Advance_GIS_UCDavis
- **Current URL:** https://mohammadrezanarimaniucdavis.github.io/ABT182_Advance_GIS_UCDavis/
- **Target Custom Domain:** geoailab.ucdavis.edu

## What We Need from UC Davis IT

### DNS Configuration Required

Chris needs to create the following DNS record:

```
Record Type: CNAME
Name: geoailab
Value: mohammadrezanarimaniucdavis.github.io
```

## Next Steps

1. ✅ **Configure in GitHub Repository Settings** (You need to do this):
   - Go to: https://github.com/MohammadrezaNarimaniUCDavis/ABT182_Advance_GIS_UCDavis/settings/pages
   - Under "Custom domain", enter: `geoailab.ucdavis.edu`
   - Click "Save"
   - GitHub will verify the CNAME file exists

2. ⏳ **Notify Chris** that GitHub is configured (send email below)

3. ⏳ **Wait for DNS Configuration** by UC Davis IT (up to 24 hours)

4. ⏳ **Verify Domain Resolution**:
   ```powershell
   Resolve-DnsName geoailab.ucdavis.edu
   ```
   
5. ⏳ **Enable HTTPS**:
   - Return to GitHub Settings → Pages
   - Check "Enforce HTTPS" (available after domain verification)

## Verification

After DNS propagation, you should see:

```powershell
PS> Resolve-DnsName geoailab.ucdavis.edu

Name           : geoailab.ucdavis.edu
Type           : CNAME
Value          : mohammadrezanarimaniucdavis.github.io
```

## Timeline

- ✅ Repository configuration: **Complete**
- ⏳ GitHub Pages custom domain setup: **~5 minutes** (you need to do this)
- ⏳ Email to Chris: **Immediate**
- ⏳ DNS configuration by IT: **1-2 days**
- ⏳ DNS propagation: **Up to 24 hours**
- ⏳ HTTPS enablement: **After verification**

**Total: 2-4 days**

---

## Important Notes

⚠️ **Before you commit and push these changes:**
   - Go to GitHub Settings → Pages
   - Add the custom domain `geoailab.ucdavis.edu`
   - Then commit and push

⚠️ **After pushing:**
   - The next deployment will include the CNAME file
   - GitHub Pages will recognize the custom domain
   - Send email to Chris (see EMAIL_TO_CHRIS.md)

---

Last updated: February 8, 2026
