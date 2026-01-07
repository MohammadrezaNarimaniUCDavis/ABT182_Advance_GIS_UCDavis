import { Mail, MapPin, Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-ucd-blue text-white mt-auto border-t-2 border-ucd-gold/20">
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-ucd-gold">Course Information</h3>
            <p className="text-sm mb-2">ABT/HYD 182 - Advanced GIS</p>
            <p className="text-sm mb-2">Winter Quarter 2026</p>
            <p className="text-sm">UC Davis</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-ucd-gold">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:amoghimi@ucdavis.edu" className="hover:text-ucd-gold transition-colors">
                  Dr. Ali Moghimi
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:mnarimani@ucdavis.edu" className="hover:text-ucd-gold transition-colors">
                  Mohammadreza Narimani
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bainer Hall 3040</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-ucd-gold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="https://www.ucdavis.edu" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 hover:text-ucd-gold transition-colors">
                <Globe className="h-4 w-4" />
                <span>UC Davis</span>
              </a>
              <a href="https://bae.ucdavis.edu" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 hover:text-ucd-gold transition-colors">
                <Globe className="h-4 w-4" />
                <span>Biological & Agricultural Engineering</span>
              </a>
              <a href="https://mohammadrezanarimaniucdavis.github.io/" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 hover:text-ucd-gold transition-colors">
                <Globe className="h-4 w-4" />
                <span>Mohammadreza Narimani - Personal Website</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2026 ABT/HYD 182 - Advanced GIS Course. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

