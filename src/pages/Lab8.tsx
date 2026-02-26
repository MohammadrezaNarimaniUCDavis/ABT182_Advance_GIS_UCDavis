import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Layers, Image as ImageIcon, BarChart2, Database, ExternalLink } from 'lucide-react'
import QASection from '../components/QASection'
import InClassQA from '../components/InClassQA'
import { CodeBlock, Section, ResourceLink } from '../components/LessonComponents'

const imgPath = (basePath: string, name: string) =>
  `${basePath}/code/colab/Week8/Demo/Images/${encodeURIComponent(name)}`

const Lab8 = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const notebookPath = `${basePath}/code/colab/Week8/Lab/ABT182_Lab8_zonal_statistics.ipynb`
  const dataUrl = 'https://ucdavis.app.box.com/s/a5s6ob31fmq349z37o2t2bftptgdaurz'

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = notebookPath
    link.download = 'ABT182_Lab8_zonal_statistics.ipynb'
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
                <span className="bg-ucd-gold text-ucd-blue px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Week 8</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-300 font-medium">Raster Analysis & Zonal Statistics</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Raster Data Analysis & Zonal Statistics</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Read multispectral imagery, compute NDVI, overlay vector zones, and run zonal statistics (min, max, median, mean) per polygon.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[200px]">
              <button
                onClick={handleDownload}
                className="group flex items-center bg-ucd-gold hover:bg-white text-ucd-blue px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full"
              >
                <Download className="h-5 w-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left min-w-0 flex-1">
                  <div className="text-xs uppercase opacity-80">Notebook</div>
                  <div className="text-sm md:text-base truncate">ABT182_Lab8_zonal_statistics.ipynb</div>
                </div>
              </button>
              <a
                href={dataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center bg-white/10 hover:bg-ucd-gold text-white hover:text-ucd-blue border border-ucd-gold/50 px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold shadow-lg transition-all duration-300 w-full"
              >
                <ExternalLink className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left min-w-0 flex-1">
                  <div className="text-xs uppercase opacity-80">Data (Box)</div>
                  <div className="text-sm md:text-base truncate">Multispectral + shapefile</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Data link */}
        <Section title="Lab Data (Box)">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg max-w-4xl">
              Download the <strong>multispectral image</strong> and <strong>shapefile</strong> (vine plot boundaries) from Box. You need these to complete the lab exercises.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <ResourceLink href={dataUrl} text="Lab 8 data on Box (multispectral_image.tif, selma_bloom_plots)" />
            </div>
          </div>
        </Section>

        {/* 1. Load raster */}
        <Section title="1. Load Multispectral Image">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Layers className="w-6 h-6 mr-3 text-ucd-blue" /> Open raster with rasterio
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Use <code>rasterio.open()</code> and <code>.read()</code> to load all bands. Check <code>shape</code>, <code>crs</code>, and <code>transform</code> for zonal stats later.
              </p>
              <CodeBlock
                code={`import rasterio
from rasterio.plot import reshape_as_image

image_rio = rasterio.open(image_path)
image_array = image_rio.read()   # (bands, rows, cols)
print("Shape:", image_array.shape)
print("CRS:", image_rio.crs)
print("Transform:", image_rio.transform)`}
                output={`Shape: (5, 3467, 2917)
CRS: EPSG:32611
Transform: | 0.05, 0.00, 269879.18|
            | 0.00,-0.05, 4047172.75|`}
              />
            </div>
          </div>
        </Section>

        {/* 2. RGB */}
        <Section title="2. Visualize RGB">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <p className="text-gray-600 mb-4 text-lg">
                Transpose to (rows, cols, bands) with <code>reshape_as_image()</code>, then plot bands 2,1,0 (G,R,B) or 1,2,0 for RGB. Normalize for display.
              </p>
              <CodeBlock
                code={`image = reshape_as_image(image_array)
rgb = image[:, :, [1, 2, 0]].astype(float)  # or [2,1,0] for B,G,R order
rgb = np.clip(rgb / np.nanpercentile(rgb, 98), 0, 1)
plt.imshow(rgb)
plt.title('Sentinel-2 RGB (California AOI)')
plt.axis('off')
plt.show()`}
                output={`# Figure: RGB composite`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: Sentinel-2 RGB (California AOI)</h4>
                </div>
                <img
                  src={imgPath(basePath, 'Sentinel-2 RGB (California AOI).png')}
                  alt="Sentinel-2 RGB California AOI"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Vector overlay */}
        <Section title="3. Load Vector & Overlay on Raster">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Database className="w-6 h-6 mr-3 text-ucd-blue" /> Shapefile and overlay
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Read the shapefile with <code>gpd.read_file()</code>. Ensure CRS matches the raster; then plot on the same axes with <code>gdf.plot(ax=ax, facecolor='none', edgecolor='red')</code>.
              </p>
              <CodeBlock
                code={`gdf = gpd.read_file(shp_path)
gdf = gdf.to_crs(image_rio.crs)  # match raster CRS
fig, ax = plt.subplots(1, 1, figsize=(10, 10))
ax.imshow(rgb, extent=extent)
gdf.plot(ax=ax, facecolor='none', edgecolor='red', linewidth=2)
plt.title('RGB with zone boundaries (sample zones)')
plt.show()`}
                output={`# Figure: RGB with zone boundaries`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: RGB with zone boundaries (sample zones)</h4>
                </div>
                <img
                  src={imgPath(basePath, 'RGB with zone boundaries (sample zones).png')}
                  alt="RGB with zone boundaries"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. NDVI */}
        <Section title="4. Compute NDVI">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <p className="text-gray-600 mb-4 text-lg">
                NDVI = (NIR − Red) / (NIR + Red). Use the red and NIR bands from your multispectral stack.
              </p>
              <CodeBlock
                code={`red = image_array[2, :, :].astype(np.float64)   # band index for red
nir = image_array[4, :, :].astype(np.float64)  # band index for NIR
ndvi = np.where((nir + red) != 0, (nir - red) / (nir + red), np.nan)
plt.imshow(ndvi, cmap='RdYlGn', vmin=-0.2, vmax=0.8)
plt.colorbar(label='NDVI')
plt.title('NDVI')
plt.axis('off')
plt.show()`}
                output={`# Figure: NDVI`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: NDVI</h4>
                </div>
                <img
                  src={imgPath(basePath, 'NDVI.png')}
                  alt="NDVI"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Mask vegetation */}
        <Section title="5. Mask Vegetation">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <p className="text-gray-600 mb-4 text-lg">
                Segment vegetation with a threshold (e.g. NDVI &gt; 0.4). Create a binary mask and optionally apply it to RGB for a masked image.
              </p>
              <CodeBlock
                code={`ndvi_threshold = 0.4
mask = ndvi > ndvi_threshold
mask_3d = np.dstack([mask] * 3)
segmented_rgb = mask_3d * rgb
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(mask, cmap='gray')
axes[1].imshow(segmented_rgb)
plt.show()`}
                output={`# Figure: NDVI mask and masked RGB`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: NDVI mask (threshold = 0.4) and masked RGB</h4>
                </div>
                <img
                  src={imgPath(basePath, 'NDVI_Mask_Threshold_4_And_Masked_RGB.png')}
                  alt="NDVI mask and masked RGB"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Zonal statistics */}
        <Section title="6. Zonal Statistics">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <BarChart2 className="w-6 h-6 mr-3 text-ucd-blue" /> rasterstats.zonal_stats
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Use <code>zonal_stats(gdf, ndvi, affine=image_rio.transform, stats=['min','max','median','mean','sum'])</code>. Convert the result to a DataFrame and merge with the GeoDataFrame.
              </p>
              <CodeBlock
                code={`from rasterstats import zonal_stats
stats = ['min', 'max', 'median', 'mean', 'sum']
ndvi_stats = zonal_stats(gdf, ndvi, affine=image_rio.transform, stats=stats, all_touched=False)
df_ndvi_stats = pd.DataFrame(ndvi_stats)
gdf_merged = pd.merge(gdf, df_ndvi_stats, how='left', left_index=True, right_index=True)`}
                output={`# Table: one row per zone with min, max, median, mean, sum of NDVI`}
              />
            </div>
          </div>
        </Section>

        {/* 7. Merge and map */}
        <Section title="7. Mean NDVI by Zone">
          <div className="space-y-6">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <p className="text-gray-600 mb-4 text-lg">
                Plot the merged GeoDataFrame with <code>column='mean'</code> to show mean NDVI per zone.
              </p>
              <CodeBlock
                code={`gdf_merged.plot(column='mean', legend=True, cmap='RdYlGn', legend_kwds={'label': 'Mean NDVI'})
plt.title('Mean NDVI by zone')
plt.axis('off')
plt.show()`}
                output={`# Figure: Mean NDVI by zone`}
              />
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="font-bold text-base text-gray-800">Output: Mean NDVI by zone</h4>
                </div>
                <img
                  src={imgPath(basePath, 'Mean_NDVI_By_Zone.png')}
                  alt="Mean NDVI by zone"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Tips */}
        <Section title="Tips for Lab 8">
          <div className="space-y-4">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                <h4 className="font-bold text-lg mb-3">Workflow summary</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Use the <strong>correct paths</strong> to the multispectral TIFF and shapefile (from Box).</li>
                  <li>Ensure <strong>CRS match</strong> between raster and vector before overlay and zonal_stats.</li>
                  <li>For zonal_stats on a numpy array, pass <code>affine=image_rio.transform</code>.</li>
                  <li>Merge stats with <code>pd.merge(gdf, df_ndvi_stats, how='left', left_index=True, right_index=True)</code>.</li>
                  <li>Lab notebook also uses <strong>NDRE</strong> (red-edge); compute it if your image has a red-edge band.</li>
                </ul>
              </div>
              <div className="mt-4 space-y-2">
                <ResourceLink href="https://rasterio.readthedocs.io/" text="Rasterio documentation" />
                <ResourceLink href="https://pythonhosted.org/rasterstats/" text="rasterstats documentation" />
              </div>
            </div>
          </div>
        </Section>

        {/* Submission */}
        <Section title="Submission Checklist">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <Layers className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">1. Complete All Exercises</h4>
                  <p className="text-sm text-gray-500">Finish all exercises in the notebook (raster read, RGB, vector overlay, NDVI/NDRE, mask, zonal stats, merge).</p>
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

        <InClassQA weekNumber={8} />
        <QASection weekNumber={8} />
      </div>
    </div>
  )
}

export default Lab8
