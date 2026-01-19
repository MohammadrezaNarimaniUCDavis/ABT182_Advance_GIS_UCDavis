import { Link } from 'react-router-dom'
import { ArrowLeft, Download, RefreshCw, Play, Terminal, Database, Repeat, Scissors, CheckSquare, FileText, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import QASection from '../components/QASection'
import { CodeBlock, Section, ResourceLink } from '../components/LessonComponents'

const Lab3 = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const notebookPath = `${basePath}/code/colab/Week3/ABT182_Lab3_loops_np_array.ipynb`

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = notebookPath
    link.download = 'ABT182_Lab3_loops_np_array.ipynb'
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
                <span className="bg-ucd-gold text-ucd-blue px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Week 3</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-300 font-medium">Loops & NumPy Arrays</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Working with Raster Data</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Master loops, NumPy arrays, and conditional statements to process multispectral imagery and analyze geospatial data.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="group flex items-center bg-ucd-gold hover:bg-white text-ucd-blue px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Download className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs uppercase opacity-80">Download Notebook</div>
                <div className="text-lg">ABT182_Lab3.ipynb</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 1. NumPy Arrays */}
        <Section title="NumPy Arrays: The Foundation of Raster Processing">
          <div className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Database className="w-6 h-6 mr-3 text-ucd-blue" /> What is NumPy?
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                NumPy (Numerical Python) is the core library for numerical computing in Python. In remote sensing, 
                raster images are stored as <strong>multidimensional NumPy arrays</strong> where each pixel is a value 
                and each band is a separate layer.
              </p>
              
              <CodeBlock 
                code={`import numpy as np

# Create a simple 2D array (like a grayscale image)
# Rows = height, Columns = width
image_2d = np.array([
    [100, 120, 140],
    [110, 130, 150],
    [105, 125, 145]
])

print(f"Image shape (rows, cols): {image_2d.shape}")
print(f"Image size: {image_2d.size} pixels")
print(f"Data type: {image_2d.dtype}")`} 
                output={`Image shape (rows, cols): (3, 3)
Image size: 9 pixels
Data type: int64`} 
              />
              
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-ucd-blue mt-6">
                <h4 className="font-bold text-lg mb-2">Why NumPy for GIS?</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Fast mathematical operations on entire arrays</li>
                  <li>Efficient memory usage for large raster datasets</li>
                  <li>Essential for image processing and spectral analysis</li>
                  <li>Compatible with rasterio, GDAL, and other GIS libraries</li>
                </ul>
              </div>

              <div className="mt-4">
                <ResourceLink href="https://numpy.org/doc/stable/user/absolute_beginners.html" text="NumPy: Absolute Basics for Beginners" />
              </div>
            </div>

            {/* Array Operations */}
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Scissors className="w-6 h-6 mr-3 text-ucd-blue" /> Array Slicing & Indexing
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Extract specific bands, regions, or pixels from your raster data using array slicing.
              </p>
              <CodeBlock 
                code={`# Simulating a 3-band RGB image (3, 4, 4)
# Format: (bands, rows, columns)
multispectral = np.array([
    [[100, 110, 120, 130],  # Red band
     [105, 115, 125, 135],
     [95, 105, 115, 125],
     [90, 100, 110, 120]],
    
    [[80, 90, 100, 110],    # Green band
     [85, 95, 105, 115],
     [75, 85, 95, 105],
     [70, 80, 90, 100]],
    
    [[60, 70, 80, 90],      # Blue band
     [65, 75, 85, 95],
     [55, 65, 75, 85],
     [50, 60, 70, 80]]
])

# Extract the red band (band index 0)
red_band = multispectral[0, :, :]
print(f"Red band shape: {red_band.shape}")

# Extract a 2x2 region from the top-left
region = multispectral[:, 0:2, 0:2]
print(f"Region shape: {region.shape}")`} 
                output={`Red band shape: (4, 4)
Region shape: (3, 2, 2)`} 
              />
            </div>
          </div>
        </Section>

        {/* 2. For Loops */}
        <Section title="For Loops: Iterating Through Data">
          <div className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Repeat className="w-6 h-6 mr-3 text-ucd-blue" /> Basic For Loops
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Loops allow you to process multiple items efficiently. In GIS, you might loop through bands, 
                pixels, or time-series data.
              </p>
              
              <CodeBlock 
                code={`# Process each spectral band
bands = ["Blue", "Green", "Red", "Red Edge", "NIR"]
band_values = [450, 550, 650, 720, 850]  # Wavelengths in nm

for i in range(len(bands)):
    print(f"{bands[i]} band: {band_values[i]} nm")

# Alternative: loop directly through items
for band, wavelength in zip(bands, band_values):
    print(f"{band}: {wavelength} nm")`} 
                output={`Blue band: 450 nm
Green band: 550 nm
Red band: 650 nm
Red Edge band: 720 nm
NIR band: 850 nm
Blue: 450 nm
Green: 550 nm
Red: 650 nm
Red Edge: 720 nm
NIR: 850 nm`} 
              />
            </div>

            {/* Nested Loops */}
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <RefreshCw className="w-6 h-6 mr-3 text-ucd-blue" /> Nested Loops
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Use nested loops to process 2D arrays (like images) row by row and column by column.
              </p>
              <CodeBlock 
                code={`# Calculate average pixel value for each row
image = np.array([
    [100, 120, 140],
    [110, 130, 150],
    [105, 125, 145]
])

row_averages = []
for row in range(image.shape[0]):
    row_sum = 0
    for col in range(image.shape[1]):
        row_sum += image[row, col]
    avg = row_sum / image.shape[1]
    row_averages.append(avg)
    print(f"Row {row} average: {avg:.1f}")`} 
                output={`Row 0 average: 120.0
Row 1 average: 130.0
Row 2 average: 125.0`} 
              />
            </div>
          </div>
        </Section>

        {/* 3. List Comprehensions */}
        <Section title="List Comprehensions: Concise Data Processing">
          <div className="max-w-5xl mx-auto">
            <p className="text-gray-600 text-lg mb-6">
              List comprehensions provide a <strong>concise way</strong> to create lists. They're faster and 
              more Pythonic than traditional loops for simple transformations.
            </p>
            
            <CodeBlock 
              code={`# Traditional approach: Create list of even numbers
even_numbers = []
for num in range(1, 21):
    if num % 2 == 0:
        even_numbers.append(num)

# List comprehension (one line!)
even_numbers = [num for num in range(1, 21) if num % 2 == 0]

# Calculate squared values for NDVI indices
ndvi_values = [0.1, 0.3, 0.5, 0.7, 0.9]
squared_ndvi = [val ** 2 for val in ndvi_values]
print(f"Squared NDVI: {squared_ndvi}")`} 
              output={`Squared NDVI: [0.01, 0.09, 0.25, 0.49, 0.81]`} 
            />
            
            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 text-yellow-900 mt-6">
              <h4 className="font-bold text-lg mb-2">When to Use List Comprehensions</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Simple transformations (filtering, mapping)</li>
                <li>Creating new lists from existing data</li>
                <li>When readability is maintained</li>
                <li><strong>Avoid</strong> for complex logic or multiple operations</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 4. Conditional Statements */}
        <Section title="Conditional Statements: Making Decisions">
          <div className="max-w-5xl mx-auto">
            <p className="text-gray-600 text-lg mb-6">
              Use <code>if</code>, <code>elif</code>, and <code>else</code> to classify pixels, filter data, 
              or apply different processing based on conditions.
            </p>
            
            <CodeBlock 
              code={`# Classify land cover based on NDVI
ndvi = 0.65

if ndvi < 0:
    land_cover = "Water"
elif ndvi < 0.2:
    land_cover = "Soil / Bare Ground"
elif ndvi < 0.5:
    land_cover = "Sparse Vegetation"
else:
    land_cover = "Dense Vegetation"

print(f"NDVI {ndvi} → {land_cover}")

# Check if location is suitable for construction
elevation = 2000  # meters
land_type = "Grassland"

if elevation < 3000 and land_type not in ["Wetland", "Forest"]:
    print("Location is suitable for construction")
else:
    print("Location is NOT suitable")`} 
              output={`NDVI 0.65 → Dense Vegetation
Location is suitable for construction`} 
            />
          </div>
        </Section>

        {/* 5. Break and Continue */}
        <Section title="Break & Continue: Controlling Loop Flow">
          <div className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <CheckSquare className="w-6 h-6 mr-3 text-ucd-blue" /> Using Break
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                <code>break</code> exits the loop immediately when a condition is met. Useful for finding 
                the first occurrence of something.
              </p>
              <CodeBlock 
                code={`# Find the first coastal city in a list
cities = ["Sacramento", "Los Angeles", "San Francisco", "Fresno"]
is_coastal = [False, True, True, False]

for i in range(len(cities)):
    if is_coastal[i]:
        print(f"The first coastal city is {cities[i]}.")
        break  # Stop searching once found`} 
                output={`The first coastal city is Los Angeles.`} 
              />
            </div>

            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <RefreshCw className="w-6 h-6 mr-3 text-ucd-blue" /> Using Continue
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                <code>continue</code> skips the rest of the current iteration and moves to the next. 
                Perfect for filtering out invalid data.
              </p>
              <CodeBlock 
                code={`# Clean sensor readings (skip missing data)
readings = [20.1, 21.3, None, 19.8, None, 22.5, 23.0]

cleaned = []
missing_count = 0

for reading in readings:
    if reading is None:
        missing_count += 1
        continue  # Skip None values
    cleaned.append(reading)

print(f"Cleaned readings: {cleaned}")
print(f"Missing data points: {missing_count}")`} 
                output={`Cleaned readings: [20.1, 21.3, 19.8, 22.5, 23.0]
Missing data points: 2`} 
              />
            </div>
          </div>
        </Section>

        {/* 6. NumPy Array Operations */}
        <Section title="NumPy Array Operations for Raster Analysis">
          <div className="space-y-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <Database className="w-6 h-6 mr-3 text-ucd-blue" /> Statistical Operations
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                NumPy provides fast statistical functions for analyzing raster data across entire arrays.
              </p>
              <CodeBlock 
                code={`# Temperature data from multiple sensors (in Celsius)
temperatures = np.array([15.2, 16.1, 14.8, 17.3, 18.5, 16.9, 19.2])

# Calculate statistics
mean_temp = np.mean(temperatures)
std_temp = np.std(temperatures)
min_temp = np.min(temperatures)
max_temp = np.max(temperatures)

print(f"Mean: {mean_temp:.2f}°C")
print(f"Std Dev: {std_temp:.2f}°C")
print(f"Range: {min_temp:.2f} to {max_temp:.2f}°C")

# Find anomalies (values > 1 standard deviation from mean)
anomalies = temperatures[np.abs(temperatures - mean_temp) > std_temp]
print(f"Anomalies: {anomalies}")`} 
                output={`Mean: 16.86°C
Std Dev: 1.58°C
Range: 14.80 to 19.20°C
Anomalies: [14.8 19.2]`} 
              />
            </div>

            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold text-xl text-gray-800 flex items-center mb-3">
                <ImageIcon className="w-6 h-6 mr-3 text-ucd-blue" /> Working with Multidimensional Arrays
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Process multispectral imagery by working with 3D arrays (bands, rows, columns).
              </p>
              <CodeBlock 
                code={`# Simulate monthly temperatures for 4 cities (4 cities × 12 months)
los_angeles = np.array([20, 20, 21, 22, 22, 23, 24, 25, 24, 23, 21, 20])
san_francisco = np.array([15, 16, 16, 17, 17, 18, 18, 19, 19, 18, 17, 16])
san_diego = np.array([19, 19, 20, 21, 21, 22, 23, 24, 23, 22, 21, 20])
sacramento = np.array([12, 13, 15, 17, 19, 22, 25, 26, 25, 21, 16, 13])

# Combine into 2D array (cities × months)
temp_array = np.array([los_angeles, san_francisco, san_diego, sacramento])

# Calculate annual average for each city (mean along columns, axis=1)
annual_avg = np.mean(temp_array, axis=1)
print(f"Annual averages: {annual_avg}")

# Find city with highest average
max_city_idx = np.argmax(annual_avg)
cities = ["Los Angeles", "San Francisco", "San Diego", "Sacramento"]
print(f"Warmest city: {cities[max_city_idx]} ({annual_avg[max_city_idx]:.2f}°C)")`} 
                output={`Annual averages: [21.83 17.08 21.33 18.42]
Warmest city: Los Angeles (21.83°C)`} 
              />
            </div>
          </div>
        </Section>

        {/* Submission Guide */}
        <Section title="Submission Checklist">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <CheckSquare className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">1. Complete All Exercises</h4>
                  <p className="text-sm text-gray-500">Finish exercises 1 through 12, including image processing.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <FileText className="w-4 h-4 text-green-600" />
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

        {/* Q&A Section */}
        <QASection weekNumber={3} />
      </div>
    </div>
  )
}

export default Lab3
