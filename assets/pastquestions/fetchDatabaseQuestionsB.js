

import { ENGLISHLANGUAGEBDATABASE, yearsENGLISHLANGUAGEB }      from '@/assets/pastquestions/englishlanguageB/ENGLISHLANGUAGEBDATABASE';
import { COREMATHEMATICSBDATABASE, yearsCOREMATHEMATICSB }      from '@/assets/pastquestions/coremathematicsB/COREMATHEMATICSBDATABASE';
import { INTEGRATEDSCIENCEBDATABASE, yearsINTEGRATEDSCIENCEB }  from '@/assets/pastquestions/integratedscienceB/INTEGRATEDSCIENCEBDATABASE';
import { SOCIALSTUDIESBDATABASE, yearsSOCIALSTUDIESB }          from '@/assets/pastquestions/socialstudiesB/SOCIALSTUDIESBDATABASE';


export const fetchDatabaseQuestionsB = (subject, isSubscribed=false) => {
    let notSubscribed = 5;
    if (subject === "ENGLISHLANGUAGE") {
        const [database, years] = isSubscribed ? [ENGLISHLANGUAGEBDATABASE, yearsENGLISHLANGUAGEB]  : [ENGLISHLANGUAGEBDATABASE, yearsENGLISHLANGUAGEB.slice(0, notSubscribed)];
        return [database, years];
    }
    if (subject === "COREMATHEMATICS") {
        const [database, years] = isSubscribed ? [COREMATHEMATICSBDATABASE, yearsCOREMATHEMATICSB]  : [COREMATHEMATICSBDATABASE, yearsCOREMATHEMATICSB.slice(0, notSubscribed)];
        return [database, years];
    }
    if (subject === "INTEGRATEDSCIENCE") {
        const [database, years] = isSubscribed ? [INTEGRATEDSCIENCEBDATABASE, yearsINTEGRATEDSCIENCEB]  : [INTEGRATEDSCIENCEBDATABASE, yearsINTEGRATEDSCIENCEB.slice(0, notSubscribed)];
        return [database, years];
    }
    if (subject === "SOCIALSTUDIES") {
        const [database, years] = isSubscribed ? [SOCIALSTUDIESBDATABASE, yearsSOCIALSTUDIESB]  : [SOCIALSTUDIESBDATABASE, yearsSOCIALSTUDIESB.slice(0, notSubscribed)];
        return [database, years];
    }
}

