import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import { Server } from 'http';
import { stringify } from 'querystring';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


// app.post('/api/loadUserSettings', (req, res) => {

// 	let connection = mysql.createConnection(config);
// 	let userID = req.body.userID;

// 	let sql = `SELECT mode FROM user WHERE userID = ?`;
// 	console.log(sql);
// 	let data = [userID];
// 	console.log(data);

// 	connection.query(sql, data, (error, results, fields) => {
// 		if (error) {
// 			return console.error(error.message);
// 		}

// 		let string = JSON.stringify(results);
// 		//let obj = JSON.parse(string);
// 		res.send({ express: string });
// 	});
// 	connection.end();
// });


app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM movies`;

	connection.query(sql, (error, results) =>{
		if(error){
			return console.error(error.message);
		}
	let string = JSON.stringify(results);

	res.send({ express: string });
	});
	connection.end();	
});

app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
		
	let insertReviewSQL = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, id, userID) VALUES (?, ?, ?, ?, ?)`;
	let insertReviewData = [req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore,req.body.movieId, req.body.userId];

	connection.query(insertReviewSQL, insertReviewData, (error, results, fields) => {
		if (error) {
		console.log(error.message);
		}
		res.send('Success');
		connection.end();	
	});
});

app.post('/api/addFeedback', (req, res) => {
	let connection = mysql.createConnection(config);
		
	let insertReviewSQL = `INSERT INTO RecommendationFeedback (watch, rating, movie_id, user_Id) VALUES ( ?, ?, ?, ?)`;
	let insertReviewData = [req.body.watch, req.body.rating, req.body.movie_Id, req.body.user_Id];
	console.log("insertReviewData:",insertReviewData)
	connection.query(insertReviewSQL, insertReviewData, (error, results, fields) => {
		if (error) {
		console.log(error.message);
		}
		res.send('Success');
		connection.end();	
	});
});




app.post('/api/getFilteredMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	const { searchTitle, searchActor, searchDirector } = req.body;
  
	let data = []; 
	let sql = 
	`SELECT
	m.id,
	m.name AS movieTitle,
	GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS DirectorNames,
	GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR ', ') AS ActorNames,
	GROUP_CONCAT(DISTINCT rv.reviewContent SEPARATOR '\n') AS ReviewContents,
	AVG(rv.reviewScore) AS AverageReviewScore
  FROM movies m
  LEFT JOIN movies_directors md ON m.id = md.movie_id
  LEFT JOIN directors d ON md.director_id = d.id
  LEFT JOIN roles r ON m.id = r.movie_id
  LEFT JOIN actors a ON r.actor_id = a.id
  LEFT JOIN Review rv ON m.id = rv.id`;

  if (searchTitle) {
    sql += ` WHERE m.name LIKE ?`;
    data.push(`%${searchTitle}%`);
  }

  `%${searchTitle}%`, `%${searchActor}%`, `%${searchDirector}%`
  if (searchDirector) {
    sql += searchTitle ? ` AND` : ` WHERE`;
    sql += ` CONCAT(d.first_name, ' ', d.last_name) LIKE ?`;
    data.push(`%${searchDirector}%`);
  }
  if (searchActor) {
    sql += (searchTitle || searchDirector) ? ` AND` : ` WHERE`;
    sql += ` CONCAT(a.first_name, ' ', a.last_name) LIKE ?`;
    data.push(`%${searchActor}%`);
  }

	sql += ` GROUP BY m.id, m.name;`

	connection.query(sql, data, (error, results) => {
	  if (error) {
		return console.error(error.message);
	  }
  
	  let string = JSON.stringify(results);

	  res.send({ express: string });
	});
  
	connection.end();
  });

  app.post('/api/getTopMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql =
	`
	SELECT m.id,
    m.name AS movieTitle,
    GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS DirectorNames,
    AVG(rv.reviewScore) AS AverageReviewScore
FROM movies m
LEFT JOIN movies_directors md ON m.id = md.movie_id
LEFT JOIN directors d ON md.director_id = d.id
LEFT JOIN Review rv ON m.id = rv.id
GROUP BY m.id, m.name
ORDER BY AverageReviewScore DESC
LIMIT 5;
`;

	connection.query(sql, (error, results) =>{
		if(error){
			return console.error(error.message);
		}
	let string = JSON.stringify(results);

	res.send({ express: string });
	});
	connection.end();	
});
  



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
