'use strict';

const Area     = require('../model/Area');
const Utils    = require('./Utils');
const Query    = require('./Query');
const Update   = require('./Update');
const Question = require('../model/Question');

/**
 * Verifica si hay status que actualizar en Area
 * @param { object } Area
 */

const areaStatus = (area) => {

    Question.find({ '_id' : { $in: area.questions }  }, (async (err, doc) => {

        if (err)
            console.log(err);

        const Status = Utils.obtainGeneralStatus(doc.map((question) => {

            return question.status;
        }));

        if (Status && area.status !== Status) {
            Update.area(area.id, 'status', Status);

            const FoundTemplate = await Query.template(area.id);
            if (FoundTemplate) {
                FoundTemplate.sections.forEach((section) => {

                    section.subsections.forEach((subsection) => {

                        if (subsection.areas.includes(area.id))
                            subsectionStatus(FoundTemplate, subsection);
                    });
                });
            }
        }

    }));

};

/**
 * Verifica si hay status que actualizar en template -> sections -> subsections
 * @param { object } template
 * @param { object } subsection
 */

const subsectionStatus = (template, subsection) => {

    const Areas = [];
    subsection.areas.forEach((area) => {

        Areas.push(area);
    });

    Area.find({ '_id' : { $in: Areas } }, (err, doc) => {

        if (err)
            console.log(err);

        const Status = Utils.obtainGeneralStatus(doc.map((area) => {

            return area.status;
        }));

        if (Status && subsection.status !== Status) {
            Update.template(
                template.id,
                'sections.subsections.name',
                subsection.name,
                '$set',
                'sections.$[].subsections.$[].status',
                Status
            );
            sectionStatus(template, subsection);
        }

    });
};

/**
 * Verifica si hay status que actualizar en template -> sections
 * @param { object } template
 * @param { object } subsection
 */

const sectionStatus = (template, subsection) => {

    template.sections.forEach((section) => {

        if (section.subsections.includes(subsection)){
            const Status = Utils.obtainGeneralStatus(section.subsections.map((sub) => {

                return sub.status;
            }));

            if (Status && section.status !== Status){
                Update.template(
                    template.id,
                    'sections.name',
                    section.name,
                    '$set',
                    'sections.$[].status',
                    Status
                );
                templateStatus(template, section);
            }

        }

    });
};

/**
 * Verifica si hay status que actualizar en template
 * @param { object } template
 */

const templateStatus = (template) => {

    const Status = Utils.obtainGeneralStatus(template.sections.map((section) => {

        return section.status;
    }));

    if (Status && template.section !== Status)
        Update.template(template.id, 'name', template.name, '$set', 'status', Status);

};

module.exports = {
    areaStatus
};

