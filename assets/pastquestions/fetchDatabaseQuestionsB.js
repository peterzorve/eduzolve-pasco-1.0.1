

import { ENGLISHLANGUAGEBDATABASE, yearsENGLISHLANGUAGEB }      from '@/assets/pastquestions/englishlanguageB/ENGLISHLANGUAGEBDATABASE';
import { COREMATHEMATICSBDATABASE, yearsCOREMATHEMATICSB }      from '@/assets/pastquestions/coremathematicsB/COREMATHEMATICSBDATABASE';
import { INTEGRATEDSCIENCEBDATABASE, yearsINTEGRATEDSCIENCEB }  from '@/assets/pastquestions/integratedscienceB/INTEGRATEDSCIENCEBDATABASE';
import { SOCIALSTUDIESBDATABASE, yearsSOCIALSTUDIESB }          from '@/assets/pastquestions/socialstudiesB/SOCIALSTUDIESBDATABASE';


export const fetchDatabaseQuestionsB = (subject) => {
    if (subject === "ENGLISHLANGUAGE") {
        return [ENGLISHLANGUAGEBDATABASE, yearsENGLISHLANGUAGEB ]
    }
    if (subject === "COREMATHEMATICS") {
        return [COREMATHEMATICSBDATABASE, yearsCOREMATHEMATICSB ]
    }
    if (subject === "INTEGRATEDSCIENCE") {
        return [INTEGRATEDSCIENCEBDATABASE, yearsINTEGRATEDSCIENCEB ]
    }
    if (subject === "SOCIALSTUDIES") {
        return [SOCIALSTUDIESBDATABASE, yearsSOCIALSTUDIESB ]
    }
}