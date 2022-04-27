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
    return mysqlService.execute(`SELECT DISTINCT r.route_id, s.stop_id, s.stop_name, s.stop_lat, s.stop_lon
                                 FROM routes r JOIN trips tr ON r.route_id = tr.route_id
                                 JOIN stop_times st ON tr.trip_id = st.trip_id
                                 JOIN stops s ON st.stop_id = s.stop_id
                                 WHERE r.route_id IN (SELECT DISTINCT T1.route_id FROM 
                                 (SELECT route_id, route_short_name, RANK() OVER (PARTITION BY route_short_name ORDER BY route_id ASC) route_rank
                                 FROM routes) T1 WHERE T1.route_rank = 1
                                 ORDER BY T1.route_id) AND r.route_id =  '${routeId}';`)
}

const listNearestStopsFromCurrLocation = (lat, long) => {
    return mysqlService.execute(`SELECT T2.stop_id, T2.stop_name, T2.stop_lat, T2.stop_lon, T2.crowdedness_density, T2.total_police_station, T2.distance_in_km FROM
                                (SELECT s.stop_id, s.stop_name, s.stop_lat, s.stop_lon, p.pax_weekday / p.platform_count AS crowdedness_density, T1.total_police_station,
                                111.111 *
                                    DEGREES(ACOS(LEAST(1.0, COS(RADIANS(s.stop_lat))
                                        * COS(RADIANS(${lat}))
                                        * COS(RADIANS(s.stop_lon - ${long}))
                                        + SIN(RADIANS(s.stop_lat))
                                        * SIN(RADIANS(${lat}))))) AS distance_in_km
                                FROM stops s JOIN patronage p ON s.stop_id = p.stop_patronage_id
                                JOIN (SELECT s.stop_id, s.stop_name, COALESCE(COUNT(*),0) AS total_police_station FROM stops s
                                LEFT JOIN police_stop ps ON s.stop_id = ps.stopid
                                GROUP BY s.stop_name) T1 ON T1.stop_id = s.stop_id
                                WHERE p.year = 2020
                                ORDER BY distance_in_km LIMIT 3) T2
                                ORDER BY T2.crowdedness_density
                                LIMIT 3;`)
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

const listCarriagesByDayRouteStopDepartureTime = (day, routeId, stopId, departureTime) => {
    return mysqlService.execute(`SELECT T1.carriage_number, COALESCE(T2.average_crowdness_level, -1) AS average_crowdness_level FROM (
                                SELECT 1 AS carriage_number
                                UNION 
                                SELECT 2 AS carriage_number
                                UNION 
                                SELECT 3 AS carriage_number
                                UNION 
                                SELECT 4 AS carriage_number
                                UNION 
                                SELECT 5 AS carriage_number
                                UNION 
                                SELECT 6 AS carriage_number
                                UNION 
                                SELECT 7 AS carriage_number
                                UNION 
                                SELECT 8 AS carriage_number
                                UNION 
                                SELECT 9 AS carriage_number
                                UNION 
                                SELECT 10 AS carriage_number) T1
                                LEFT JOIN
                                (SELECT carriage_number, ROUND(AVG(crowdness_level),2) AS average_crowdness_level FROM crowdedness
                                WHERE day = '${day}' AND crowd_route_id = '${routeId}' AND crowd_stop_id = ${stopId} AND departure_time = '${departureTime}'
                                GROUP BY carriage_number) T2 ON T1.carriage_number = T2.carriage_number;`)
}

const listCriminalActivitiesForEachCarriage = (carriageNumber, day, routeId, stopId, departureTime) => {
    return mysqlService.execute(`SELECT criminal_activity FROM crowdedness
                                WHERE criminal_activity != 'none' AND carriage_number = ${carriageNumber} AND day = '${day}' AND crowd_route_id = '${routeId}' AND crowd_stop_id = ${stopId} AND departure_time = '${departureTime}';`)
}

const listAllTripWishlist = () => {
    return mysqlService.execute(`SELECT tw.wishlist_id, tw.source_name, tw.destination_name, s.stop_name, r.route_long_name, tw.departure_time, tw.carriage_number FROM trip_wishlist tw
                                JOIN stops s ON s.stop_id = tw.stop_id
                                JOIN routes r ON r.route_id = tw.route_id;`);
}

const reportCrowdedness = (params) => {
    return mysqlService.execute(`INSERT INTO crowdedness (crowdness_id, crowd_stop_id, crowd_route_id, departure_time, direction_id, day, carriage_number, crowdness_level, criminal_activity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, params)
}

const addTripWishlist = (params) => {
    return mysqlService.execute(`INSERT INTO trip_wishlist (wishlist_id, source_name, destination_name, stop_id, route_id, departure_time, carriage_number) VALUES (?, ?, ?, ?, ?, ?, ?)`, params)
}

const deleteTripWishlistById = (wishlistId) => {
    return mysqlService.execute(`DELETE FROM trip_wishlist WHERE wishlist_id = '${wishlistId}';`)
}





module.exports = {
    listRoutesBasedOnDestType,
    listStopsBasedOnRouteId,
    listDepartureTimeBasedOnDirectionRouteIdAndStopId,
    listAllRoutesBasedOnStopDirectionAndCurrLocation,
    listNearestStopsFromCurrLocation,
    listCarriagesByDayRouteStopDepartureTime,
    listAllTripWishlist,
    listCriminalActivitiesForEachCarriage,
    reportCrowdedness,
    addTripWishlist,
    deleteTripWishlistById
}