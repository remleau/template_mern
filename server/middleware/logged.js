module.exports = (req, res, next) => {

  let token = req.cookies['token'];
	if(token){
		res.json({message: 'Vous êtes déjà connecté.'});
	}else{
		next();
	}

};