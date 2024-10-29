

import { ENGLISHLANGUAGEADATABASE,      yearsENGLISHLANGUAGEA }     from '@/assets/pastquestions/englishlanguageA/ENGLISHLANGUAGEADATABASE';
import { COREMATHEMATICSADATABASE,      yearsCOREMATHEMATICSA }     from '@/assets/pastquestions/coremathematicsA/COREMATHEMATICSADATABASE';
import { INTEGRATEDSCIENCEADATABASE,    yearsINTEGRATEDSCIENCEA }   from '@/assets/pastquestions/integratedscienceA/INTEGRATEDSCIENCEADATABASE';
import { SOCIALSTUDIESADATABASE,        yearsSOCIALSTUDIESA }       from '@/assets/pastquestions/socialstudiesA/SOCIALSTUDIESADATABASE';


export const fetchDatabaseQuestionsA = (subject) => {
    if (subject === "ENGLISHLANGUAGE") {
        return [ENGLISHLANGUAGEADATABASE, yearsENGLISHLANGUAGEA ]
    }
    if (subject === "COREMATHEMATICS") {
        return [COREMATHEMATICSADATABASE, yearsCOREMATHEMATICSA ]
    }
    if (subject === "INTEGRATEDSCIENCE") {
        return [INTEGRATEDSCIENCEADATABASE, yearsINTEGRATEDSCIENCEA ]
    }
    if (subject === "SOCIALSTUDIES") {
        return [SOCIALSTUDIESADATABASE, yearsSOCIALSTUDIESA ]
    }
}