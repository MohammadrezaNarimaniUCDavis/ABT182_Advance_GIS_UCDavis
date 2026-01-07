import { Link } from 'react-router-dom'
import { Code, Map, ArrowRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { LabSession } from '../data/courseData'

interface SessionCardProps {
  session: LabSession
  weekNumber: number
}

const SessionCard = ({ session, weekNumber }: SessionCardProps) => {
  return (
    <Link to={`/week/${weekNumber}/session/${session.sessionNumber}`}>
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6 card-hover border border-gray-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="bg-ucd-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {session.sessionNumber}
              </div>
              <h3 className="text-xl font-bold text-ucd-blue">{session.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{session.description}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {session.pythonFeatures && session.pythonFeatures.length > 0 && (
            <div className="flex items-start space-x-2">
              <Code className="h-5 w-5 text-ucd-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-700">Python Features:</p>
                <p className="text-sm text-gray-600">{session.pythonFeatures.join(', ')}</p>
              </div>
            </div>
          )}
          
          {session.gisRecap && session.gisRecap.length > 0 && (
            <div className="flex items-start space-x-2">
              <Map className="h-5 w-5 text-ucd-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-700">GIS Recap:</p>
                <p className="text-sm text-gray-600">{session.gisRecap.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-ucd-blue font-semibold group pt-2 border-t border-gray-200">
          <span>Open Session</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  )
}

export default SessionCard

