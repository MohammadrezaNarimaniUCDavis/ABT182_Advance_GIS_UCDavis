# Week 8 Demo: Zonal Statistics with Public Multispectral & Vector Data

This folder contains a **demo lab** that mirrors **Lab 8 (Raster Data Analysis & Zonal Statistics)** but uses **only publicly available data**—no Box or Canvas downloads required.

---

## What This Demo Does

- **Raster**: Sentinel-2 L2A multispectral imagery from [Microsoft Planetary Computer](https://planetarycomputer.microsoft.com/) (red, green, blue, NIR).
- **Vector**: California wildfire perimeters from [California Open Data / CAL FIRE GIS](https://data.cnra.ca.gov/dataset/cal-fire-gis), or synthetic sample zones if no fires fall in the scene.
- **Workflow** (same as Lab 8):
  1. Load and inspect multispectral image (shape, CRS, transform).
  2. Visualize RGB.
  3. Load vector (fire perimeters or sample zones).
  4. Overlay vector on raster.
  5. Compute NDVI.
  6. Mask vegetation (NDVI threshold).
  7. Run **zonal statistics** (min, max, median, mean, sum) per polygon.
  8. Merge stats back into the GeoDataFrame and plot mean NDVI by zone.

---

## Files

| File | Description |
|------|-------------|
| `ABT182_Week8_Demo_zonal_statistics_wildfire.ipynb` | Demo notebook (run top to bottom). |
| `README_Demo_Lab8.md` | This file: setup and run instructions. |

---

## How to Run the Demo

### Option A: Google Colab (recommended)

1. Upload `ABT182_Week8_Demo_zonal_statistics_wildfire.ipynb` to Colab (**File → Upload notebook**), or open from Google Drive.
2. Run all cells in order (**Runtime → Run all**).
3. No Google Drive mount or local paths are required; data is fetched from the internet.

### Option B: Local (VS Code, PyCharm, Jupyter)

1. Create a virtual environment and install dependencies:
   ```bash
   pip install rasterio geopandas rasterstats pystac-client planetary-computer
   ```
2. Open the notebook and run all cells.
3. Ensure your machine has internet access (Planetary Computer and CAL FIRE URLs must be reachable).

---

## Data Sources (no login required)

- **Sentinel-2 L2A**: [Planetary Computer STAC API](https://planetarycomputer.microsoft.com/dataset/sentinel-2-l2a). Uses `pystac_client` and `planetary_computer` to sign and read COG URLs.
- **Fire perimeters**: California Natural Resources Agency Open Data, e.g.  
  [California Fire Perimeters (all) – GeoJSON](https://gis.data.cnra.ca.gov/api/download/v1/items/e3802d2abf8741a187e73a9db49d68fe/geojson?layers=0).  
  If this URL is slow or fails, the notebook falls back to **synthetic rectangular zones** so zonal statistics still run.

---

## Customizing the Demo

- **Change area**: Edit the `bbox` in the second code block (e.g. different California coordinates or a known fire area).
- **Change date**: Edit `datetime="2023-08-01/2023-09-30"` in the `catalog.search(...)` call (e.g. a specific fire season).
- **Smaller vector file**: If the full fire perimeters GeoJSON is too large, use “Recent Large Fire Perimeters” from [data.cnra.ca.gov](https://data.cnra.ca.gov/dataset/recent-large-fire-perimeters-gt-5000-acres) and replace `fire_perimeters_url` with that dataset’s GeoJSON download URL.

---

## Using This as a Template for Your Own Demo Lab

1. **Keep the same structure** as the main Lab 8: Exercise 1 → read raster & metadata; Exercise 2 → RGB; Exercise 3 → load vector & overlay; Exercise 4–5 → NDVI/NDRE; Exercise 6 → mask; Exercise 7 → zonal stats; Exercise 8 → merge and summarize.
2. **Swap data**:
   - **Raster**: Any multispectral source that provides Red and NIR (e.g. Landsat via Planetary Computer or Earth Explorer; other STAC endpoints).
   - **Vector**: Any polygon layer that overlaps the raster (e.g. traffic zones, land use, administrative boundaries, or fire perimeters from another region).
3. **Indices**: Keep NDVI; add NDRE if you have a red-edge band; for burn severity you can add NBR if you have SWIR.
4. **Zonal stats**: Keep `rasterstats.zonal_stats` with `affine=transform` and merge with `pd.merge(..., left_index=True, right_index=True)` as in the main lab.

---

## Troubleshooting

- **“No Sentinel-2 scenes found”**: Widen `bbox` or `datetime`, or reduce cloud cover (e.g. `"lt": 30`).
- **Fire perimeter URL timeout**: Use “Recent Large Fire Perimeters” or a local GeoJSON; the notebook will still run with synthetic zones if the URL fails.
- **CRS mismatch**: The demo reprojects the vector to the raster CRS (`gdf.to_crs(crs)`); ensure both are valid.

---

## Relation to Main Lab 8

- **Lab 8**: Vineyard multispectral image (Box) + vine plot shapefile (Box); NDVI/NDRE; zonal stats per vine; correlation with nitrogen.
- **This demo**: Sentinel-2 (Planetary Computer) + California fire perimeters (open data); NDVI; zonal stats per fire/sample zone; same concepts, different application (wildfire/vegetation over California).

You can present this demo in class first, then assign the full Lab 8 with the vineyard data so students practice the same workflow with course-specific datasets.
