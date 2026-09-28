import os
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

def create_og_banner():
    # 1. Canvas Setup (Standard Open Graph 1200 x 630)
    width, height = 1200, 630
    banner = Image.new("RGB", (width, height), "#FAF8F5")
    draw = ImageDraw.Draw(banner)

    # 2. Top Accent Borders
    draw.rectangle([0, 0, width, 10], fill="#7A162B")   # Maroon
    draw.rectangle([0, 10, width, 14], fill="#C69214")  # Gold

    # 3. Load Fonts
    georgia_bold_path = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
    georgia_italic_path = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
    arial_bold_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    arial_regular_path = "/System/Library/Fonts/Supplemental/Arial.ttf"

    font_title = ImageFont.truetype(georgia_bold_path, 54)
    font_slogan = ImageFont.truetype(georgia_italic_path, 20)
    font_subtitle = ImageFont.truetype(arial_bold_path, 23)
    font_district = ImageFont.truetype(arial_regular_path, 20)
    font_fppc = ImageFont.truetype(arial_bold_path, 15)
    font_paidfor = ImageFont.truetype(arial_regular_path, 14)

    # 4. Paste Campaign Logo
    logo_path = "assets/images/campaign-header-logo-transparent.png"
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        # Scale logo maintaining aspect ratio (target max height 110)
        target_h = 105
        aspect = logo.width / logo.height
        target_w = int(target_h * aspect)
        logo_resized = logo.resize((target_w, target_h), Image.LANCZOS)
        banner.paste(logo_resized, (60, 42), logo_resized)

    # 5. Left Column Text (x = 60, y starts below logo)
    y_cursor = 175

    # Decorative Green Accent Line
    draw.rectangle([60, y_cursor, 110, y_cursor + 4], fill="#0D8A5E")
    y_cursor += 16

    # Tagline / Slogan
    draw.text((60, y_cursor), "\"Your Children, Our Community, My Commitment.\"", fill="#0D8A5E", font=font_slogan)
    y_cursor += 36

    # Candidate Name
    draw.text((60, y_cursor), "Dawn Smollen", fill="#7A162B", font=font_title)
    y_cursor += 68

    # Candidate Subtitle / Position
    draw.text((60, y_cursor), "FOR PARK BOARD 2026 • AREA 2", fill="#C69214", font=font_subtitle)
    y_cursor += 36

    # District Title
    draw.text((60, y_cursor), "Director, Rancho Simi Recreation & Park District", fill="#334155", font=font_district)
    y_cursor += 54

    # FPPC & Paid For Box
    fppc_box_x = 60
    fppc_box_y = y_cursor
    fppc_box_w = 560
    fppc_box_h = 95

    # Background card for FPPC notice
    draw.rounded_rectangle(
        [fppc_box_x, fppc_box_y, fppc_box_x + fppc_box_w, fppc_box_y + fppc_box_h],
        radius=10,
        fill="#FFFFFF",
        outline="#E2E8F0",
        width=1
    )
    # Left maroon accent bar on box
    draw.rounded_rectangle(
        [fppc_box_x, fppc_box_y, fppc_box_x + 5, fppc_box_y + fppc_box_h],
        radius=2,
        fill="#7A162B"
    )

    draw.text((fppc_box_x + 20, fppc_box_y + 16), "PAID FOR BY DAWN SMOLLEN FOR PARK BOARD 2026", fill="#7A162B", font=font_fppc)
    draw.text((fppc_box_x + 20, fppc_box_y + 40), "Rancho Simi Recreation and Park District • Area 2", fill="#475569", font=font_paidfor)
    draw.text((fppc_box_x + 20, fppc_box_y + 62), "FPPC 1493967 • Simi Valley, CA", fill="#C69214", font=font_fppc)

    # 6. Right Column Portrait Framing (x = 660, y = 42, w = 480, h = 546)
    portrait_w, portrait_h = 480, 546
    portrait_x, portrait_y = 660, 42

    # Load Dawn's portrait
    portrait_source = "assets/images/dawn-hero-portrait.jpg"
    if not os.path.exists(portrait_source):
        portrait_source = "assets/images/IMG_2586.jpeg"

    if os.path.exists(portrait_source):
        img_dawn = Image.open(portrait_source).convert("RGB")
        # Crop to 480x546 without ANY squishing or stretching (centering top 15% for perfect face alignment)
        cropped_portrait = ImageOps.fit(img_dawn, (portrait_w, portrait_h), method=Image.LANCZOS, centering=(0.5, 0.15))

        # Create rounded mask for portrait
        mask = Image.new("L", (portrait_w, portrait_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, portrait_w, portrait_h], radius=16, fill=255)

        # Drop shadow behind portrait card
        shadow_bg = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow_bg)
        shadow_draw.rounded_rectangle(
            [portrait_x - 4, portrait_y - 2, portrait_x + portrait_w + 4, portrait_y + portrait_h + 6],
            radius=18,
            fill=(15, 23, 42, 40)
        )
        shadow_blurred = shadow_bg.filter(ImageFilter.GaussianBlur(10))
        banner.paste(shadow_blurred, (0, 0), shadow_blurred)

        # Paste portrait
        banner.paste(cropped_portrait, (portrait_x, portrait_y), mask)

        # Draw elegant Gold Border around portrait card
        overlay_draw = ImageDraw.Draw(banner)
        overlay_draw.rounded_rectangle(
            [portrait_x, portrait_y, portrait_x + portrait_w, portrait_y + portrait_h],
            radius=16,
            outline="#C69214",
            width=5
        )

    # 7. Save Artifact Output Banner Images
    jpg_path = "assets/images/og-share-banner.jpg"
    png_path = "assets/images/og-share-banner.png"

    banner.save(jpg_path, "JPEG", quality=95)
    banner.save(png_path, "PNG")

    print(f"Successfully generated new high-quality Open Graph banner at:\n- {jpg_path}\n- {png_path}")

if __name__ == "__main__":
    create_og_banner()
