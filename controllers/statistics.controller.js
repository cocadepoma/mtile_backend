const { response } = require("express");
const db = require("../db/connection");




const getStatistics = async (req, res = response) => {

    const [one] = await db.query('SELECT count(types.name) as "total", types.name FROM `events` INNER JOIN `types` ON types.id = events.orderType WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY types.name');
    const [two] = await db.query('SELECT count(events.id) as "total", sections.name, WEEKOFYEAR(events.start) AS "week" FROM `events` INNER JOIN `sections` ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY sections.name, WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC');
    // const [weeks] = await db.query('SELECT WEEKOFYEAR(events.start) AS "week" FROM events INNER JOIN sections ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC');
    // const [almacen] = await db.query('SELECT count(events.id) as "total", sections.name, WEEKOFYEAR(events.start) AS "week" FROM `events` INNER JOIN `sections` ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() AND sections.name = "Almacén" GROUP BY "total", WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC');


    res.status(200).json({
        one,
        two,
    })
}

const getLastWeekByOrderType = async (req, res = response) => {

    try {
        const [orderTypeWeeks] = await db.query('SELECT count(types.name) as "total", types.name FROM `events` INNER JOIN `types` ON types.id = events.orderType WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY types.name');

        if (!orderTypeWeeks) {
            return res.status(404).json({
                msg: 'orderTypeWeeks not found'
            });
        }

        res.status(200).json({
            orderTypeWeeks,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}


const getWeeks = async (req, res = response) => {

    try {
        const [weeks] = await db.query('SELECT WEEKOFYEAR(events.start) AS "week" FROM events INNER JOIN sections ON sections.id = events.section WHERE events.start >= DATE_SUB(NOW(), INTERVAL 20 DAY) AND events.start <= NOW() GROUP BY WEEKOFYEAR(events.start) ORDER BY WEEKOFYEAR(events.start) ASC');


        if (!weeks) {
            return res.status(404).json({
                msg: 'Error, no weeks found'
            });
        }

        res.status(200).json({
            weeks,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}

const getStatisticsBySectionWeek = async (req, res = response) => {

    try {
        const { week } = req.params || 1;
        const { section } = req.body;

        const [data] = await db.query(`SELECT COUNT(*) as "total" FROM events INNER JOIN sections ON sections.id = events.section WHERE WEEK(events.start) = ${parseInt(week)} AND sections.name = '${section}' GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC`);

        if (!data) {
            return res.status(404).json({
                msg: 'Error, no stadistics found'
            });
        }

        res.status(200).json({
            data,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}


const getIntervencionsWeeks = async (req, res = response) => {

    try {
        const [interventionsWeeks] = await db.query('SELECT WEEK(events.start) AS "week", COUNT(*) AS "count" FROM `events` WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC');

        if (!interventionsWeeks) {
            return res.status(404).json({
                msg: 'Error, no interventions found'
            });
        }

        res.status(200).json({
            interventionsWeeks,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}

const getTotalTimeByWeek = async (req, res = response) => {

    try {
        const [totalTimeWeeks] = await db.query('SELECT WEEK(events.start) AS "week", SUM(events.totalMins) AS "totalMins" FROM `events` WHERE events.start >= DATE_SUB(NOW(), INTERVAL 22 DAY) AND events.start <= NOW() GROUP BY WEEK(events.start) ORDER BY WEEK(events.start) ASC');


        if (!totalTimeWeeks) {
            return res.status(404).json({
                msg: 'Error, no timeweeks found'
            });
        }

        res.status(200).json({
            totalTimeWeeks,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}

const getLastWeekByBreakdown = async (req, res = response) => {

    try {
        const [breakdownWeeks] = await db.query('SELECT count(*) as "total", breakdowns.name FROM `events` INNER JOIN `breakdowns` ON breakdowns.id = events.breakdown WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY breakdowns.name');

        if (!breakdownWeeks) {
            return res.status(404).json({
                msg: 'breakdownWeeks not found'
            });
        }

        res.status(200).json({
            breakdownWeeks,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}

const getLastWeekByTechnician = async (req, res = response) => {

    try {
        const [techniciansWeeks] = await db.query('SELECT count(*) as "total", technicians.name FROM `events` INNER JOIN `technicians` ON technicians.id = events.technician WHERE events.start >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND events.start <= NOW() GROUP BY technicians.name');

        if (!techniciansWeeks) {
            return res.status(404).json({
                msg: 'techniciansWeek not found'
            });
        }

        res.status(200).json({
            techniciansWeeks,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }
}

module.exports = {
    getStatistics,
    getLastWeekByOrderType,
    getWeeks,
    getStatisticsBySectionWeek,
    getIntervencionsWeeks,
    getTotalTimeByWeek,
    getLastWeekByBreakdown,
    getLastWeekByTechnician
}