import React, { useState, useEffect } from 'react'
import './ModalCalendario.css'

const ModalCalendario = ({ isOpen, onClose }) => {
  const [fecha, setFecha] = useState(new Date())

  useEffect(() => {
    if (isOpen) {
      setFecha(new Date())
    }
  }, [isOpen])

  if (!isOpen) return null

  const today = new Date()
  const year = fecha.getFullYear()
  const month = fecha.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayIndex = new Date(year, month, 1).getDay()
  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const cambiarMes = (incremento) => {
    setFecha(new Date(year, month + incremento, 1))
  }

  const esHoy = (dia) =>
    dia === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="calendar-modal" onClick={e => e.stopPropagation()}>
        
        <h2 className="calendar-title">Calendario</h2>

        <div className="calendar-header">
          <button className="nav-btn" onClick={() => cambiarMes(-1)}>◀</button>
          <span className="month-text">
            {fecha.toLocaleString('es', { month: 'long', year: 'numeric' })}
          </span>
          <button className="nav-btn" onClick={() => cambiarMes(1)}>▶</button>
        </div>

        <div className="calendar-grid">
          {weekdays.map(d => (
            <div key={d} className="weekday">{d}</div>
          ))}

          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dia = i + 1
            return (
              <div 
                key={i} 
                className={`day ${esHoy(dia) ? 'today' : ''}`}
              >
                {dia}
              </div>
            )
          })}
        </div>

        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default ModalCalendario