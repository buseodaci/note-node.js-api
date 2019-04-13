var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

  dbo=db.db('notes');

   app.post('/notes/add', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    dbo.collection('notes').insertOne(note, (err, result) => {
      if (err) {
        res.json({ 'error': 'An error has occurred' });
      } else {
        res.json(result.ops[0]);
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    dbo.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.json({ 'error': 'An error has occured' });
      } else {
        res.json(item);
      }
    });
  });

  app.delete('/notes/delete/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    dbo.collection('notes').deleteOne(details, (err, item) => {
      if (err) {
        res.json({ 'error': 'An error has occured' });
      } else {
        res.json('Note ' + id + ' deleted!');
      }
    });
  });

  app.put('/notes/update/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    dbo.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.json({'error':'An error has occurred'});
      } else {
       //   res.send(note);
        res.json(note);
      } 
    });
  });

  app.get('/notes',(req,res)=>{
   dbo.collection('notes').find({}).toArray(function (err,result) {
     if(err){
       res.json({'error':'An error has occurred'});
     } else{
       res.json(result)
     }
   })
  });
};