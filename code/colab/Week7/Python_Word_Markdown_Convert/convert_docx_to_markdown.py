"""
Convert Word document to Markdown using Pandoc
Extracts images, text boxes, and preserves formatting
Week 7: Experience Builder Tutorial.docx -> Markdown
"""

import subprocess
import os
import re

# Paths configuration
PANDOC_PATH = r"C:\Program Files\Pandoc\pandoc.exe"
INPUT_DOCX = r"C:\mnarimani\1-UCDavis\9-Github\ABT182_Advance_GIS_UCDavis\code\colab\Week7\Lab_Instruction\Experience Builder Tutorial.docx"
OUTPUT_DIR = r"C:\mnarimani\1-UCDavis\9-Github\ABT182_Advance_GIS_UCDavis\code\colab\Week7\Lab_Instruction\Markdown"
OUTPUT_MD = os.path.join(OUTPUT_DIR, "Experience Builder Tutorial.md")
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")

def ensure_directories():
    """Create output directories if they don't exist"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)
    print(f"[OK] Created directories:")
    print(f"  - {OUTPUT_DIR}")
    print(f"  - {IMAGES_DIR}")

def convert_docx_to_markdown():
    """
    Convert DOCX to Markdown using Pandoc
    Extracts images and preserves formatting
    """
    print(f"\nConverting DOCX to Markdown...")
    print(f"Input: {INPUT_DOCX}")
    print(f"Output: {OUTPUT_MD}\n")
    
    # Pandoc command with options to extract images and preserve formatting
    cmd = [
        PANDOC_PATH,
        INPUT_DOCX,
        "-o", OUTPUT_MD,
        "--extract-media", OUTPUT_DIR,  # Extract images to media folder
        "--wrap=preserve",  # Preserve line wrapping
        "--markdown-headings=atx",  # Use ATX-style headings (# ## ###)
        "-f", "docx",  # From DOCX format
        "-t", "markdown",  # To Markdown format
        "--standalone"  # Produce standalone document
    ]
    
    try:
        # Run pandoc
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True
        )
        
        print("[OK] Conversion successful!")
        
        # Check if images were extracted
        media_dir = os.path.join(OUTPUT_DIR, "media")
        if os.path.exists(media_dir) and os.listdir(media_dir):
            print(f"[OK] Images extracted to: {media_dir}")
            print(f"  - {len(os.listdir(media_dir))} image(s) found")
        
        print(f"\n[OK] Markdown file created: {OUTPUT_MD}")
        
        # Display file size
        if os.path.exists(OUTPUT_MD):
            size = os.path.getsize(OUTPUT_MD)
            print(f"  - File size: {size:,} bytes")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Error during conversion:")
        print(f"  - {e.stderr}")
        return False
    except FileNotFoundError:
        print(f"[ERROR] Pandoc not found at: {PANDOC_PATH}")
        print("  - Please verify Pandoc is installed")
        return False
    except Exception as e:
        print(f"[ERROR] Unexpected error: {str(e)}")
        return False

def post_process_markdown():
    """
    Post-process the markdown file if needed
    Fix links, image paths, add sectionized structure (headings, horizontal rules, TOC).
    """
    if not os.path.exists(OUTPUT_MD):
        return
    
    print(f"\nPost-processing markdown file...")
    
    with open(OUTPUT_MD, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix image paths - convert absolute paths to relative paths
    pattern = r']\([^)]*\\Markdown[/\\]media[/\\]([^)]+\.(?:png|jpg|jpeg|gif|svg))\)'
    content = re.sub(pattern, r'](media/\1)', content)
    
    # Remove Pandoc width/height attributes
    content = re.sub(r'\{width="[^"]*"\s*height="[^"]*"\}', '', content)
    
    # Fix weird links: [url]{.underline} or [[url]{.underline}](url) -> proper markdown [url](url)
    # Pattern 1: [https://...]{.underline}(https://...)  (single bracket, then parens)
    content = re.sub(
        r'\[(https://[^\]]+)\]\{\.underline\}\((https://[^)]+)\)',
        r'[\1](\2)',
        content
    )
    # Pattern 2: [[https://...]{.underline}](https://...)  (double bracket)
    content = re.sub(
        r'\[\[(https://[^\]]+)\]\{\.underline\}\]\((https://[^)]+)\)',
        r'[\1](\2)',
        content
    )
    # Pattern 3: [https://...]{.underline}  (standalone - no closing link, make it clickable)
    content = re.sub(
        r'\[(https://[^\]]+)\]\{\.underline\}',
        r'[\1](\1)',
        content
    )
    # Fix underlined text: [word]{.underline} -> word (non-URLs)
    content = re.sub(r'\[([^\]]+)\]\{\.underline\}', r'\1', content)
    # Friendly link text for the main ArcGIS Online link (so it shows "ArcGIS Online" not the URL)
    content = content.replace(
        "at [https://www.arcgis.com/index.html](https://www.arcgis.com/index.html)",
        "at [ArcGIS Online](https://www.arcgis.com/index.html)"
    )
    # Remove any remaining literal {.underline} that might slip through (e.g. from different Pandoc output)
    content = content.replace("{.underline}", "")
    
    # --- Sectionized organization: convert bold section titles to headings and add ---
    section_blocks = [
        (r'\n\*\*How to Use Experience Builder\*\*\n', '\n\n---\n\n## How to Use Experience Builder\n\n'),
        (r'\n\*\*Experience Builder Components\*\*\n', '\n\n---\n\n## Experience Builder Components\n\n'),
        (r'\n\*\*Widgets\*\*\\\\\n', '\n\n### Widgets\n\n'),
        (r'\n\*\*Pages\*\*\\\\\n', '\n\n### Pages\n\n'),
        (r'\n\*\*Data\*\*\\\\\n', '\n\n### Data\n\n'),
        (r'\n\*\*Content, Style, and Action\*\*\\\\\n', '\n\n### Content, Style, and Action\n\n'),
        (r'\n\*\*Interactivity\*\*\\\\\n', '\n\n### Interactivity\n\n'),
        (r'\n\*\*Publishing and Sharing\*\*\\\\\n', '\n\n### Publishing and Sharing\n\n'),
        (r'\n\*\*Example Exercise: Create an App for Yosemite National Park to show the trails\*\*\n', '\n\n---\n\n## Example Exercise: Create an App for Yosemite National Park to show the trails\n\n'),
        (r'\n\*\*1\) Quick setup:\*\* ', '\n\n---\n\n### 1) Quick setup\n\n'),
        (r'\n\*\*2\) Adding Header:\*\* ', '\n\n### 2) Adding Header\n\n'),
        (r'\n\*\*3\) Adding Data:\*\* ', '\n\n### 3) Adding Data\n\n'),
        (r'\n\*\*4\) Adding Page\*\*: ', '\n\n### 4) Adding Page\n\n'),
        (r'\n\*\*5\) Connecting Widgets\*\*: ', '\n\n### 5) Connecting Widgets\n\n'),
        (r'\n\*\*6\) Adding Actions to the Widgets\*\*: ', '\n\n### 6) Adding Actions to the Widgets\n\n'),
        (r'\n\*\*7\) Dynamic Content & Data View:\*\* ', '\n\n### 7) Dynamic Content & Data View\n\n'),
        (r'\n\*\*8\) Adding chart:\*\*\\\\\n', '\n\n### 8) Adding chart\n\n'),
        (r'\n\*\*9\) Mobile Optimization:\*\*\n', '\n\n### 9) Mobile Optimization\n\n'),
        (r'\n\*\*10\) Publishing Apps:\*\* ', '\n\n### 10) Publishing Apps\n\n'),
    ]
    for pattern, replacement in section_blocks:
        content = re.sub(pattern, replacement, content)
    
    # Insert Table of Contents after title block (after "Source: Esri Developers", before first ---)
    toc = (
        "\n\n---\n\n"
        "## Table of Contents\n\n"
        "- [How to Use Experience Builder](#how-to-use-experience-builder)\n"
        "- [Experience Builder Components](#experience-builder-components)\n"
        "  - [Widgets](#widgets)\n"
        "  - [Pages](#pages)\n"
        "  - [Data](#data)\n"
        "  - [Content, Style, and Action](#content-style-and-action)\n"
        "  - [Interactivity](#interactivity)\n"
        "  - [Publishing and Sharing](#publishing-and-sharing)\n"
        "- [Example Exercise: Create an App for Yosemite National Park](#example-exercise-create-an-app-for-yosemite-national-park-to-show-the-trails)\n"
        "  - [1) Quick setup](#1-quick-setup)\n"
        "  - [2) Adding Header](#2-adding-header)\n"
        "  - [3) Adding Data](#3-adding-data)\n"
        "  - [4) Adding Page](#4-adding-page)\n"
        "  - [5) Connecting Widgets](#5-connecting-widgets)\n"
        "  - [6) Adding Actions to the Widgets](#6-adding-actions-to-the-widgets)\n"
        "  - [7) Dynamic Content & Data View](#7-dynamic-content--data-view)\n"
        "  - [8) Adding chart](#8-adding-chart)\n"
        "  - [9) Mobile Optimization](#9-mobile-optimization)\n"
        "  - [10) Publishing Apps](#10-publishing-apps)\n\n"
        "---\n\n"
    )
    if '## Table of Contents' not in content:
        content = re.sub(
            r'(Source: Esri Developers\n)\n+(---\n\n## How to Use Experience Builder)',
            r'\1' + toc + r'\2',
            content,
            count=1
        )
    
    # Write back the modified content
    with open(OUTPUT_MD, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("[OK] Post-processing complete")
    print("  - Fixed image paths to relative format")
    print("  - Removed inline dimension attributes")
    print("  - Fixed link/underline formatting")
    print("  - Added section headings and horizontal rules")
    print("  - Added Table of Contents")

def main():
    """Main execution function"""
    print("=" * 60)
    print("DOCX to Markdown Converter using Pandoc (Week 7)")
    print("=" * 60)
    
    # Check if input file exists
    if not os.path.exists(INPUT_DOCX):
        print(f"[ERROR] Input file not found: {INPUT_DOCX}")
        return
    
    # Check if Pandoc exists
    if not os.path.exists(PANDOC_PATH):
        print(f"[ERROR] Pandoc not found at: {PANDOC_PATH}")
        return
    
    # Create directories
    ensure_directories()
    
    # Convert
    success = convert_docx_to_markdown()
    
    if success:
        # Post-process if needed
        post_process_markdown()
        
        print("\n" + "=" * 60)
        print("[OK] CONVERSION COMPLETE!")
        print("=" * 60)
        print(f"\nOutput files:")
        print(f"  - Markdown: {OUTPUT_MD}")
        print(f"  - Images: {os.path.join(OUTPUT_DIR, 'media')}")
    else:
        print("\n[ERROR] Conversion failed. Please check the errors above.")

if __name__ == "__main__":
    main()
