# Week 5 Demo – USA Data Sources

Place the files below in this folder: `Week5/Demo/Data/`

---

## 1. USA States Shapefile (boundaries)

**Source: U.S. Census Bureau TIGER/Line**

- **Direct download (ZIP):** https://www2.census.gov/geo/tiger/TIGER2024/STATE/tl_2024_us_state.zip  
- **Or use the Census shapefile picker:** https://www.census.gov/cgi-bin/geo/shapefiles/index.php → choose **Geography: State**, **Year: 2024**, then download.

**Steps:**
1. Download the ZIP.
2. Unzip into **`tl_2024_us_state`** under `Week5/Demo/Data/`.
3. The notebook uses: **`Week5/Demo/Data/tl_2024_us_state/tl_2024_us_state.shp`**

**Contents:** State boundaries; the `NAME` column has state names (e.g. "California", "Texas") for joining to the CSV.

---

## 2. USA State-Level CSV (population, food insecurity, or other indicators)

The demo expects a CSV with **one row per state per year** and at least:

- A **state name** column (same names as the shapefile `NAME`, e.g. "California", "Texas").
- A **year** column (e.g. 2020, 2021).
- At least one **numeric** column to map (e.g. Population, Food Insecurity).

**DataUSA does not offer a “Download CSV” button.** The site uses an API that returns JSON. You have two practical options below.

---

### Option A – Census Bureau state population (direct CSV download)

**Step 1 – Open the Census page**

- **Page:** https://www.census.gov/data/tables/time-series/demo/popest/2020s-state-total.html  

**Step 2 – Download the CSV**

- Under **“Vintage 2025”** (or **“Vintage 2024”**) find the **“Datasets”** section.
- Click the **CSV** link for **“NST-EST2025-ALLDATA”** (or NST-EST2024-ALLDATA).  
  Direct link (2025):  
  **https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv**

**Step 3 – Reshape to the format the demo needs**

The Census file is **wide**: one row per state, with columns like `POPESTIMATE2020`, `POPESTIMATE2021`, etc. The demo expects **long** format: one row per state per year, with columns `State`, `Year`, `Population`.

- **In Excel:** Use “Unpivot” or copy/paste so you have columns: **State** (or **NAME**), **Year**, **Population**. Save as `US_state_data.csv` in `Week5/Demo/Data/`.
- **Provided:** This folder includes **`US_state_data.csv`** in that format (State, Year, Population for 2020–2025).
- **To regenerate:** Download the Census CSV above, then in Excel use "Unpivot", or in Python melt the `POPESTIMATE20xx` columns to long format and save as `US_state_data.csv`.

**Step 4 – Match state names**

- The Census file may use a column like `NAME` or `Geographic Area`. Rename it to **State** if your shapefile join expects “State”, or keep **NAME** so it matches the shapefile’s `NAME` column. The demo notebook can align either way.

---

### Option B – DataUSA (API only – no CSV export on the website)

DataUSA does **not** have a “Export CSV” or “Download CSV” for state profiles. Data is provided via their **API** (JSON).

**To get state + year + one variable (e.g. Population):**

1. **Open this URL in your browser** (returns state population by year as JSON):  
   **https://datausa.io/api/data?drilldowns=State&measures=Population**  

2. You will see JSON, not a CSV. To get a CSV you can:
   - **Option B1:** Use a short Python script that requests this URL, parses the JSON, and writes a CSV with columns like `State`, `Year`, `Population` to `US_state_data.csv`.  
   - **Option B2:** Copy the `"data"` array from the JSON, paste into a tool that converts JSON to CSV (e.g. https://www.convertcsv.com/json-to-csv.htm), then add a header row **State, Year, Population** and save as `US_state_data.csv`.

So: **do not search DataUSA for an “export CSV” or “download CSV” button** – use the API link above and then convert JSON → CSV as above.

---

---

## Quick checklist

- [ ] TIGER 2024 State shapefile unzipped as **`Week5/Demo/Data/tl_2024_us_state/`**.
- [ ] **`US_state_data.csv`** is in **`Week5/Demo/Data/`** (provided; columns: State, Year, Population).
- [ ] Run the notebook from **Week5/Demo** so `Data` and `Images` paths resolve correctly.
