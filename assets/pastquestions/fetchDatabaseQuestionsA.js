

import { ENGLISHLANGUAGEADATABASE,      yearsENGLISHLANGUAGEA }     from '@/assets/pastquestions/englishlanguageA/ENGLISHLANGUAGEADATABASE';
import { COREMATHEMATICSADATABASE,      yearsCOREMATHEMATICSA }     from '@/assets/pastquestions/coremathematicsA/COREMATHEMATICSADATABASE';
import { INTEGRATEDSCIENCEADATABASE,    yearsINTEGRATEDSCIENCEA }   from '@/assets/pastquestions/integratedscienceA/INTEGRATEDSCIENCEADATABASE';
import { SOCIALSTUDIESADATABASE,        yearsSOCIALSTUDIESA }       from '@/assets/pastquestions/socialstudiesA/SOCIALSTUDIESADATABASE';


export const fetchDatabaseQuestionsA = (subject, isSubscribed=false) => {
    let notSubscribed = 5;
    if (subject === "ENGLISHLANGUAGE") {
        const [database, years] = isSubscribed ? [ENGLISHLANGUAGEADATABASE, yearsENGLISHLANGUAGEA]  : [ENGLISHLANGUAGEADATABASE, yearsENGLISHLANGUAGEA.slice(0, notSubscribed)];
        return [database, years];
    }

    if (subject === "COREMATHEMATICS") {
        const [database, years] = isSubscribed ? [COREMATHEMATICSADATABASE, yearsCOREMATHEMATICSA]  : [COREMATHEMATICSADATABASE, yearsCOREMATHEMATICSA.slice(0, notSubscribed)];
        return [database, years];
    }

    if (subject === "INTEGRATEDSCIENCE") {
        const [database, years] = isSubscribed ? [INTEGRATEDSCIENCEADATABASE, yearsINTEGRATEDSCIENCEA]  : [INTEGRATEDSCIENCEADATABASE, yearsINTEGRATEDSCIENCEA.slice(0, notSubscribed)];
        return [database, years];
    }

    if (subject === "SOCIALSTUDIES") {
        const [database, years] = isSubscribed ? [SOCIALSTUDIESADATABASE, yearsSOCIALSTUDIESA]  : [SOCIALSTUDIESADATABASE, yearsSOCIALSTUDIESA.slice(0, notSubscribed)];
        return [database, years];
    }
}