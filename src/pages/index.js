import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {

  const [selectedDate, setSelectedDate] = useState(new Date()) 

  const formatDate = (date) => {
    return date.toISOString().slice(0,10)
  }

  const getEntryByDate = (YYYYMMDDString) => {
    return fetch(`/api/entries/${YYYYMMDDString}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res=>res.json());
  }

  const postEntryByDate = (YYYYMMDDString, form) => {
    return fetch(`/api/entries/${YYYYMMDDString}`,{
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res=>res.json());
  }
  
 
  const [form,setForm] = useState({
    symptoms: '1',
    isDairy: true,
    isSalty: true,
  })

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1) 
    setSelectedDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  const fetchSelectedDateFromApi = (date) => {
    getEntryByDate(formatDate(date)).then((entry) =>
    setForm(entry))
  }

  useEffect(() => {
    fetchSelectedDateFromApi(selectedDate);
},[])

  const handleSubmit = (event) => {
    event.preventDefault()
    postEntryByDate(formatDate(selectedDate),form)
    }
  ;

  return (
    <>
      <main className={styles.main}>

        <h2>
          <button onClick={goToPreviousDay()}>{'<'}</button>SelectedDate:{' '}
          <button onClick={goToNextDay()}>{'>'}</button>
          Selected Date:{formatDate(selectedDate)}

        </h2>

        <form onSubmit={handleSubmit} className={styles['symptoms-form']}>
        <h3>Symptoms</h3>

        <label>
        <input type='radio' value='3' name='symptoms' checked ={form.symptoms == '3'}
            onChange={(e) => setForm({
              ...form,
              symptoms: e.target.value,
            })
        }/>
          Recovering
        </label>

        <label>
        <input type='radio' checked ={form.symptoms == '2'} value='2' name='symptoms'
          onChange={(e) => setForm({
            ...form,
            symptoms: e.target.value,
          })
        }/>
          Average
        </label>

        <label>
        <input type='radio' value='1' name='symptoms' checked ={form.symptoms == '1'}
        onChange={(e) => setForm({
          ...form,
          symptoms: e.target.value,
        })
      }/>
          Bad
        </label>

        <h3>Data Points</h3>

        <label>
        <input type='checkbox' name='isSalty' checked={form.isSalty} value="true" onChange={(e) => setForm({
          ...form, isSalty: !form.isSalty,
        })
      }
          />
          Did you have a lot of salt today?
        </label>   
         
        <label>
        <input type='checkbox' name='isDairy'  checked={form.isDairy} value="true" onChange={(e) => setForm({
          ...form, isDairy: !form.isDairy,
        })
      }/>
          Did you have dairy today?
        </label>       

        <button type='submit'>Save</button>
        </form>
      </main>
    </>
  )
}
