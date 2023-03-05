import { supabase } from "../../../../supabase"

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const {dateString} = req.query
    let { data, error } = await supabase
      .from('BRUH')
      .select("*")
      .eq('date', dateString) 
      const existingEntry = data[0];
      if(existingEntry){
        const { data, error } = await supabase
        .from('BRUH')
        .update()
        .eq({ 'date': dateString})
        res.status(200).json(data);
      }
      else{
          const { data, error } = await supabase.from('BRUH')
          .insert([
          { symptoms: req.body.symptoms, isDairy: req.body.isDairy, isSalty: req.body.isSalty, date: new Date().toISOString().slice(0,10)},
      ])
      res.status(200).json(data);
    }
    } 
    else if(req.method == 'GET'){
      const {dateString} = req.query
      let { data, error } = await supabase
      .from('BRUH')
      .select("*")
      .eq('date', dateString) 
      const existingEntry = data[0];
      let entryToReturn = existingEntry || {
        symptoms: 2,
        isDairy: false,
        isSalty: false
      }
      res.status(200).json(existingEntry) 
    }
    else{
      res.status(404).end('Not Found')
    }
  }