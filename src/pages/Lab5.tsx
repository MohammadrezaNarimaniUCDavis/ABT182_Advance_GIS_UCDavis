import { Link } from 'react-router-dom'
import { ArrowLeft, Download, MapPin, Layers, BarChart2, Database, Image as ImageIcon } from 'lucide-react'
import QASection from '../components/QASection'
import InClassQA from '../components/InClassQA'
import { CodeBlock, Section, ResourceLink } from '../components/LessonComponents'

const Lab5 = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const notebookPath = `${basePath}/code/colab/Week5/Lab/ABT182_Lab5_geopandas.ipynb`

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = notebookPath
    link.download = 'ABT182_Lab5_geopandas.ipynb'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-ucd-blue text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ucd-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-ucd-gold hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-ucd-gold text-ucd-blue px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Week 5</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-300 font-medium">GeoPandas & Vector Data</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">GeoPandas with Vector Data</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Work with shapefiles, reprojection, area, choropleths, and attribute joins to map California counties and USA states.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="group flex items-center bg-ucd-gold hover:bg-white text-ucd-blue px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full md:w-auto"
            >
              <Download className="h-5 w-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs uppercase opacity-80">Download Notebook</div>
                <div className="text-sm md:text-lg truncate">ABT182_Lab5_geopandas.ipynb</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* GeoPandas USA overview */}
        <Section title="GeoPandas with USA Data (contiguous US)">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg max-w-4xl lg:max-w-5xl xl:max-w-6xl">
              USA states (contiguous US only: lower 48 + DC). Same workflow as <strong>Lab 5</strong> with California counties: read shapefile → reproject → area → choropleths → join CSV → map variables.
            </p>
          </div>
        </Section>

        {/* Data sources — links so users can get the same data */}
        <Section title="Data Sources (Get the Same Data)">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg max-w-4xl">
              Download USA states shapefile and population CSV to run the demo locally.
            </p>
            <div className="max-w-5xl space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-lg text-ucd-blue mb-2">1. USA States Shapefile</h3>
                <p className="text-gray-600 mb-3">
                  <strong>Source:</strong> U.S. Census Bureau TIGER/Line 2024.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><ResourceLink href="https://www2.census.gov/geo/tiger/TIGER2024/STATE/tl_2024_us_state.zip" text="Direct download (ZIP)" /></li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">Unzip to <code>Data/tl_2024_us_state/tl_2024_us_state.shp</code>.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-lg text-ucd-blue mb-2">2. State Population CSV</h3>
                <p className="text-gray-600 mb-3">
                  <strong>Source:</strong> U.S. Census Bureau population estimates. Long format with columns: <code>State</code>, <code>Year</code>, <code>Population</code>.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><ResourceLink href="https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" text="Direct CSV" /> — reshape from wide to long format.</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">Pre-built <code>US_state_data.csv</code> (2020–2025) available in <code>Week5/Demo/Data/</code>.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 1. Read shapefile — code then actual output */}
        <Section title="1. Read Shapefile and Explore">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Layers className="w-6 h-6 mr-3 text-ucd-blue" /> Load a shapefile with GeoPandas
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                In Lab 5 you read a <strong>California county boundaries</strong> shapefile. Same pattern: <code>gpd.read_file(path)</code>, then inspect <code>.head()</code>, <code>.columns</code>, and <code>.crs</code>.
              </p>
              <CodeBlock
                code={`import geopandas as gpd

states = gpd.read_file(SHP_PATH)
print(states.head())
print('\\nShape:', states.shape)
print('Columns:', list(states.columns))
print('\\nCRS:', states.crs)`}
                output={`  REGION DIVISION STATEFP  ... STUSPS           NAME  ... geometry
0      3        5      54  ...     WV  West Virginia  ... POLYGON ((-77.75 39.33...
1      3        5      12  ...     FL        Florida  ... MULTIPOLYGON (((-83.10...
2      2        3      17  ...     IL       Illinois  ... POLYGON ((-87.89 38.28...
...

Shape: (56, 16)
Columns: ['REGION', 'DIVISION', 'STATEFP', 'STATENS', 'GEOID', 'GEOIDFQ', 'STUSPS', 'NAME', 'LSAD', 'MTFCC', 'FUNCSTAT', 'ALAND', 'AWATER', 'INTPTLAT', 'INTPTLON', 'geometry']

CRS: EPSG:4269`}
              />
            </div>
          </div>
        </Section>

        {/* 2. Reproject and area — computation only, no plot */}
        <Section title="2. Reproject and Add Area (km²)">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <MapPin className="w-6 h-6 mr-3 text-ucd-blue" /> Use a projected CRS for area
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Reproject to a projected CRS (e.g. EPSG:5070 for USA), then compute area in km². Lab 5 asks for area in km².
              </p>
              <CodeBlock
                code={`# Reproject to equal-area (e.g. EPSG:5070 for USA; use appropriate CRS for CA)
gdf = states.to_crs(5070)
gdf['area'] = gdf.geometry.area / 1_000_000   # m² → km²
print(gdf[['NAME', 'area']].head(10))`}
                output={`             NAME           area
0   West Virginia   62755.438109
1         Florida  184934.309000
2        Illinois  149995.054520
3       Minnesota  225182.049911
4        Maryland   32131.069585
5    Rhode Island    4001.454713
6           Idaho  216441.518208
7   New Hampshire   24216.084673
8  North Carolina  139389.430056
9         Vermont   24903.239355`}
              />
            </div>
          </div>
        </Section>

        {/* 3. Basic map first — code then image Step1 */}
        <Section title="3. Basic Map (No Variable)">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <p className="text-gray-600 mb-4 text-lg">
                Simple boundary map: <code>gdf.plot(ax=ax, color='steelblue', edgecolor='k')</code>. Use to check geometry before choropleths.
              </p>
              <CodeBlock
                code={`fig, ax = plt.subplots(1, 1, figsize=(10, 6))
gdf.plot(ax=ax, alpha=0.8, color='steelblue', edgecolor='k')
ax.set_title('USA States (contiguous US)')
plt.tight_layout()
plt.show()`}
                output={`# Figure displayed: USA States (contiguous US)`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: USA States (contiguous US)</h4>
                </div>
                <img
                  src={`${basePath}/code/colab/Week5/Demo/Images/Step1_StatesMap.png`}
                  alt="USA states base map (contiguous US)"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Area choropleth — code then image Step2 */}
        <Section title="4. Area Choropleth (by area)">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <p className="text-gray-600 mb-4 text-lg">
                After computing <code>area</code>, plot a choropleth: <code>gdf.plot(ax=ax, column='area', cmap='viridis', legend=True)</code>.
              </p>
              <CodeBlock
                code={`fig, ax = plt.subplots(1, 1, figsize=(10, 6))
gdf.plot(ax=ax, column='area', cmap='viridis', legend=True, edgecolor='k')
ax.set_title('USA States by area (km²) (contiguous US)')
plt.tight_layout()
plt.show()`}
                output={`# Figure displayed: USA States by area (km²) (contiguous US)`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: USA States by area (km²) (contiguous US)</h4>
                </div>
                <img
                  src={`${basePath}/code/colab/Week5/Demo/Images/Step2_AreaChoropleth.png`}
                  alt="Choropleth of USA states by area"
                  className="w-full h-auto"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-sm text-gray-600">Choropleth colored by <code>area</code>. In Lab 5 do the same for California counties.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Summary stats and classification — code, actual output, then image Step3 */}
        <Section title="5. Summary Statistics and Choropleth Classification">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <BarChart2 className="w-6 h-6 mr-3 text-ucd-blue" /> Largest / smallest and classification schemes
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Use <code>.agg()</code>, <code>.idxmax()</code>, <code>.idxmin()</code>. For choropleths use <code>scheme='fisher_jenks'</code> or <code>scheme='quantiles'</code> (requires <code>mapclassify</code>).
              </p>
              <CodeBlock
                code={`# Summary statistics
stats = gdf['area'].agg(['sum', 'mean', 'max', 'min', 'std'])
for k, v in stats.items():
    print(f'{k}: {v}')
idx_max = gdf['area'].idxmax()
idx_min = gdf['area'].idxmin()
print(f"\\nLargest: {gdf.loc[idx_max, 'NAME']} ({gdf.loc[idx_max, 'area']:.2f} km²)")
print(f"Smallest: {gdf.loc[idx_min, 'NAME']} ({gdf.loc[idx_min, 'area']:.2f} km²)")`}
                output={`sum: 7617932.261225478
mean: 155468.0053311322
max: 696241.0188930663
min: 177.02595526618632
std: 140878.0890224005

Largest: Texas (696241.02 km²)
Smallest: District of Columbia (177.03 km²)`}
              />
              <p className="text-gray-600 mt-4 mb-2 font-medium">Plot choropleth with classification schemes (Fisher Jenks and Quantiles):</p>
              <CodeBlock
                code={`try:
    import mapclassify
except ImportError:
    import subprocess
    subprocess.check_call(['pip', 'install', 'mapclassify'])
    import mapclassify

fig, axes = plt.subplots(1, 2, figsize=(14, 6))
gdf.plot(ax=axes[0], column='area', cmap='OrRd', legend=True, edgecolor='k', scheme='fisher_jenks')
axes[0].set_title('Fisher Jenks (contiguous US)')
gdf.plot(ax=axes[1], column='area', cmap='OrRd', legend=True, edgecolor='k', scheme='quantiles')
axes[1].set_title('Quantiles (contiguous US)')
plt.tight_layout()
plt.savefig(os.path.join(IMAGES_DIR, 'Step3_AreaSchemes.png'), dpi=150, bbox_inches='tight')
plt.show()`}
                output={`# Figure displayed: Fisher Jenks (left) and Quantiles (right) (contiguous US)`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: Fisher Jenks and Quantiles (contiguous US)</h4>
                </div>
                <img
                  src={`${basePath}/code/colab/Week5/Demo/Images/Step3_AreaSchemes.png`}
                  alt="Choropleth classification schemes"
                  className="w-full h-auto"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-sm text-gray-600">Left: Fisher Jenks; Right: Quantiles. Use <code>scheme=</code> in <code>gdf.plot(column=..., scheme='fisher_jenks')</code>.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Read CSV and merge — code then actual output */}
        <Section title="6. Read CSV and Merge (Attribute Join)">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Database className="w-6 h-6 mr-3 text-ucd-blue" /> Join tabular data to the map
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                CSV must have a column matching the shapefile (e.g. <code>NAME</code>). Demo renames <code>State</code> → <code>NAME</code>, then <code>gdf.merge(df, on='NAME', how='inner')</code>.
              </p>
              <CodeBlock
                code={`import pandas as pd

df = pd.read_csv(CSV_PATH)
print(df.head())
if 'State' in df.columns and 'NAME' not in df.columns:
    df = df.rename(columns={'State': 'NAME'})
merged_gdf = gdf.merge(df, on='NAME', how='inner')
print('\\nMerged shape:', merged_gdf.shape)`}
                output={`  State  Year  Population
0  Alabama  2020     5032962
1  Alabama  2021     5050058
2  Alabama  2022     5076868
...

Merged shape: (294, 19)`}
              />
            </div>
          </div>
        </Section>

        {/* 7. Variable by year — code, output, then image Step4 then Step5 */}
        <Section title="7. Choropleth by Variable and Year">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <ImageIcon className="w-6 h-6 mr-3 text-ucd-blue" /> Map a numeric variable (e.g. Population) for one year
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Filter by <code>Year</code>, then <code>gdf_year.plot(ax=ax, column='Population', cmap='viridis', legend=True)</code>. Lab 5 asks you to map a variable from your CSV for a chosen year.
              </p>
              <CodeBlock
                code={`# Plot variable for one year
gdf_year = merged_gdf[merged_gdf['Year'] == 2025].copy()
fig, ax = plt.subplots(1, 1, figsize=(10, 6))
gdf_year.plot(ax=ax, column='Population', cmap='viridis', legend=True, edgecolor='k')
ax.set_title('Population (2025) (contiguous US)')
plt.tight_layout()
plt.show()`}
                output={`# Figure displayed: Population (2025) (contiguous US)`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: Population (2025) (contiguous US)</h4>
                </div>
                <img
                  src={`${basePath}/code/colab/Week5/Demo/Images/Step4_Variable_Year.png`}
                  alt="Population choropleth by year"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-gray-600 mt-6 mb-2 font-medium">Same plot with YlOrBr colormap:</p>
              <CodeBlock
                code={`fig, ax = plt.subplots(1, 1, figsize=(10, 6))
gdf_year.plot(ax=ax, column='Population', cmap='YlOrBr', legend=True, edgecolor='k')
ax.set_title('Population (2025) (contiguous US)')
plt.tight_layout()
plt.show()`}
                output={`# Figure displayed: Population (2025) (contiguous US) with YlOrBr colormap`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: Population with YlOrBr colormap (contiguous US)</h4>
                </div>
                <img
                  src={`${basePath}/code/colab/Week5/Demo/Images/Step5_Variable_YlOrBr.png`}
                  alt="Population choropleth YlOrBr"
                  className="w-full h-auto"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-sm text-gray-600">Use <code>cmap='YlOrBr'</code> or other colormaps for different styles.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Tips for Lab 5 */}
        <Section title="Tips to Solve Lab 5 Better">
          <div className="space-y-4">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                <h4 className="font-bold text-lg mb-3">Lab 5 workflow (California counties):</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Use the <strong>correct paths</strong> to the CA county shapefile and CSV (as given in the notebook).</li>
                  <li>Check <strong>CRS</strong> after reading; reproject to a projected CRS before computing area.</li>
                  <li>Match the <strong>join column</strong>: shapefile <code>NAME</code> (or county name column) must match the CSV column (e.g. <code>County</code>). Rename if needed.</li>
                  <li>For <strong>largest/smallest</strong> by area, use <code>.idxmax()</code> / <code>.idxmin()</code> on the area column.</li>
                  <li>For <strong>choropleths</strong>, use <code>gdf.plot(column='...', cmap='...', legend=True)</code>; add <code>scheme='fisher_jenks'</code> or <code>quantiles</code> if you use <code>mapclassify</code>.</li>
                  <li>If your CSV has a <strong>year</strong> column, filter by year before plotting: <code>gdf[gdf['Year'] == year]</code>.</li>
                </ul>
              </div>
              <div className="mt-4 space-y-2">
                <div><ResourceLink href="https://geopandas.org/en/stable/docs.html" text="GeoPandas documentation" /></div>
                <div><ResourceLink href="https://geopandas.org/en/stable/gallery/choropleths.html" text="GeoPandas choropleth examples" /></div>
              </div>
            </div>
          </div>
        </Section>

        {/* Submission Checklist */}
        <Section title="Submission Checklist">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <Layers className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">1. Complete All Exercises</h4>
                  <p className="text-sm text-gray-500">Finish all GeoPandas exercises in the notebook (read, reproject, area, stats, choropleths, merge, map variable).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <ImageIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">2. Generate PDF</h4>
                  <p className="text-sm text-gray-500">File → Print → Save as PDF (required).</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center text-center">
              <h4 className="font-bold text-ucd-blue mb-2">Required Files</h4>
              <p className="text-sm text-gray-500 mb-4">Upload to Canvas:</p>
              <div className="flex space-x-4">
                <span className="bg-white border border-gray-200 px-3 py-1 rounded font-mono text-sm text-gray-600">.ipynb</span>
                <span className="bg-white border border-gray-200 px-3 py-1 rounded font-mono text-sm text-gray-600">.pdf</span>
              </div>
            </div>
          </div>
        </Section>

        <InClassQA weekNumber={5} />
        <QASection weekNumber={5} />
      </div>
    </div>
  )
}

export default Lab5
