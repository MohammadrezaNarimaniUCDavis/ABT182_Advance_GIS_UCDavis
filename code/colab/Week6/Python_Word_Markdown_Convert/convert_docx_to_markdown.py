"""
Convert Word document to Markdown using Pandoc
Extracts images, text boxes, and preserves formatting
"""

import subprocess
import os
from pathlib import Path

# Paths configuration
PANDOC_PATH = r"C:\Program Files\Pandoc\pandoc.exe"
INPUT_DOCX = r"C:\mnarimani\1-UCDavis\9-Github\ABT182_Advance_GIS_UCDavis\code\colab\Week6\Lab_Instruction\DOCX\Lab_6.docx"
OUTPUT_DIR = r"C:\mnarimani\1-UCDavis\9-Github\ABT182_Advance_GIS_UCDavis\code\colab\Week6\Lab_Instruction\Markdown"
OUTPUT_MD = os.path.join(OUTPUT_DIR, "Lab_6.md")
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")

def ensure_directories():
    """Create output directories if they don't exist"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)
    print(f"✓ Created directories:")
    print(f"  - {OUTPUT_DIR}")
    print(f"  - {IMAGES_DIR}")

def convert_docx_to_markdown():
    """
    Convert DOCX to Markdown using Pandoc
    Extracts images and preserves formatting
    """
    print(f"\n🔄 Converting DOCX to Markdown...")
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
        
        print("✓ Conversion successful!")
        
        # Check if images were extracted
        media_dir = os.path.join(OUTPUT_DIR, "media")
        if os.path.exists(media_dir) and os.listdir(media_dir):
            print(f"✓ Images extracted to: {media_dir}")
            print(f"  - {len(os.listdir(media_dir))} image(s) found")
        
        print(f"\n✓ Markdown file created: {OUTPUT_MD}")
        
        # Display file size
        if os.path.exists(OUTPUT_MD):
            size = os.path.getsize(OUTPUT_MD)
            print(f"  - File size: {size:,} bytes")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during conversion:")
        print(f"  - {e.stderr}")
        return False
    except FileNotFoundError:
        print(f"❌ Pandoc not found at: {PANDOC_PATH}")
        print("  - Please verify Pandoc is installed")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        return False

def post_process_markdown():
    """
    Post-process the markdown file if needed
    Can adjust image paths, add metadata, etc.
    """
    if not os.path.exists(OUTPUT_MD):
        return
    
    print(f"\n🔍 Post-processing markdown file...")
    
    with open(OUTPUT_MD, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix image paths - convert absolute paths to relative paths
    import re
    
    # Replace absolute Windows paths with relative paths
    # Pattern matches: C:\...\Markdown/media/imageX.png
    pattern = r']\([^)]*\\Markdown[/\\]media[/\\]([^)]+\.(?:png|jpg|jpeg|gif|svg))\)'
    replacement = r'](media/\1)'
    content = re.sub(pattern, replacement, content)
    
    # Remove Pandoc width/height attributes
    pattern = r'\{width="[^"]*"\s*height="[^"]*"\}'
    content = re.sub(pattern, '', content)
    
    # Write back the modified content
    with open(OUTPUT_MD, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Post-processing complete")
    print("  - Fixed image paths to relative format")
    print("  - Removed inline dimension attributes")

def main():
    """Main execution function"""
    print("=" * 60)
    print("DOCX to Markdown Converter using Pandoc")
    print("=" * 60)
    
    # Check if input file exists
    if not os.path.exists(INPUT_DOCX):
        print(f"❌ Input file not found: {INPUT_DOCX}")
        return
    
    # Check if Pandoc exists
    if not os.path.exists(PANDOC_PATH):
        print(f"❌ Pandoc not found at: {PANDOC_PATH}")
        return
    
    # Create directories
    ensure_directories()
    
    # Convert
    success = convert_docx_to_markdown()
    
    if success:
        # Post-process if needed
        post_process_markdown()
        
        print("\n" + "=" * 60)
        print("✓ CONVERSION COMPLETE!")
        print("=" * 60)
        print(f"\nOutput files:")
        print(f"  - Markdown: {OUTPUT_MD}")
        print(f"  - Images: {os.path.join(OUTPUT_DIR, 'media')}")
    else:
        print("\n❌ Conversion failed. Please check the errors above.")

if __name__ == "__main__":
    main()
