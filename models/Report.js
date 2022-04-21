'use strict';

const mysqlService = require('../services/mysql');


const listRoutesBasedOnDestType = (directionId) => {
    return mysqlService.execute(`SELECT T1.route_id, T1.route_short_name, T1.route_long_name, T1.trip_headsign, T1.direction_id FROM 
                                (SELECT DISTINCT r.route_id, r.route_short_name, r.route_long_name, t.trip_headsign, t.direction_id, RANK() OVER (PARTITION BY route_short_name, trip_headsign ORDER BY route_id ASC) route_rank
                                FROM routes r JOIN trips t ON r.route_id = t.route_id) T1 
                                WHERE T1.route_rank = 1 AND T1.direction_id = ${directionId}
                                ORDER BY T1.route_id, T1.route_short_name;`)
}

const listStopsBasedOnRouteId = (routeId) => {
    return mysqlService.execute(`SELECT DISTINCT r.route_id, s.stop_id, s.stop_name
                                 FROM routes r JOIN trips tr ON r.route_id = tr.route_id
                                 JOIN stop_times st ON tr.trip_id = st.trip_id
                                 JOIN stops s ON st.stop_id = s.stop_id
                                 WHERE r.route_id IN (SELECT DISTINCT T1.route_id FROM 
                                 (SELECT route_id, route_short_name, RANK() OVER (PARTITION BY route_short_name ORDER BY route_id ASC) route_rank
                                 FROM routes) T1 WHERE T1.route_rank = 1
                                 ORDER BY T1.route_id) AND r.route_id =  '${routeId}';`)
}

const listDepartureTimeBasedOnDirectionRouteIdAndStopId = (directionId, routeId, stopId) => {
    return mysqlService.execute(`SELECT DISTINCT r.route_id, st.stop_id, st.departure_time
                                FROM routes r JOIN trips tr ON r.route_id = tr.route_id
                                JOIN stop_times st ON tr.trip_id = st.trip_id
                                WHERE r.route_id IN (SELECT DISTINCT T1.route_id FROM 
                                (SELECT route_id, route_short_name, RANK() OVER (PARTITION BY route_short_name ORDER BY route_id ASC) route_rank
                                FROM routes) T1 WHERE T1.route_rank = 1
                                ORDER BY T1.route_id)
                                AND tr.direction_id = ${directionId} AND r.route_id = '${routeId}' AND st.stop_id = ${stopId} AND departure_time < '23:00:00'
                                ORDER BY st.arrival_time, st.departure_time;`)
}

const listAllRoutesBasedOnStopDirectionAndCurrLocation = (stopId, directionId, lat, long) => {
    return mysqlService.execute(`SELECT DISTINCT T3.route_id, T3.route_long_name, T3.trip_headsign, T3.departure_time FROM
                                ( SELECT DISTINCT s.stop_id, r.route_id, r.route_long_name, tr.trip_headsign, st.departure_time
                                FROM stop_times st JOIN trips tr ON st.trip_id = tr.trip_id
                                JOIN stops s  ON s.stop_id = st.stop_id
                                JOIN routes r ON tr.route_id = r.route_id
                                WHERE r.route_id IN (SELECT DISTINCT T1.route_id FROM 
                                (SELECT route_id, route_long_name, RANK() OVER (PARTITION BY route_short_name ORDER BY route_id ASC) route_rank
                                FROM routes) T1 WHERE T1.route_rank = 1
                                ORDER BY T1.route_id) 
                                AND s.stop_id = ${stopId}
                                AND tr.direction_id = ${directionId}
                                AND departure_time < '23:00:00'
                                ORDER BY r.route_id, r.route_long_name, s.stop_name, st.arrival_time, st.departure_time ) T3
                                JOIN
                                (SELECT DISTINCT r.route_id, r.route_long_name
                                FROM routes r JOIN trips tr ON r.route_id = tr.route_id
                                JOIN stop_times st ON st.trip_id = tr.trip_id
                                JOIN stops s ON s.stop_id = st.stop_id
                                WHERE r.route_id  IN (SELECT DISTINCT T1.route_id FROM 
                                (SELECT route_id, route_short_name, RANK() OVER (PARTITION BY route_short_name ORDER BY route_id ASC) route_rank
                                FROM routes) T1 WHERE T1.route_rank = 1
                                ORDER BY T1.route_id) AND tr.direction_id = ${directionId} AND s.stop_id IN (SELECT T2.stop_id FROM
                                (SELECT T1.stop_id, T1.stop_name, T1.stop_lat, T1.stop_lon, T1.distance_in_km, RANK() OVER (ORDER BY T1.distance_in_km) AS ranking FROM
                                (SELECT stop_id, stop_name, stop_lat, stop_lon,
                                111.111 *
                                    DEGREES(ACOS(LEAST(1.0, COS(RADIANS(stop_lat))
                                        * COS(RADIANS(${lat}))
                                        * COS(RADIANS(stop_lon - ${long}))
                                        + SIN(RADIANS(stop_lat))
                                        * SIN(RADIANS(${lat}))))) AS distance_in_km          
                                FROM stops) T1) T2
                                WHERE T2.ranking = 1)) T4 ON T3.route_id = T4.route_id;`)
}




module.exports = {
    listRoutesBasedOnDestType,
    listStopsBasedOnRouteId,
    listDepartureTimeBasedOnDirectionRouteIdAndStopId,
    listAllRoutesBasedOnStopDirectionAndCurrLocation
}