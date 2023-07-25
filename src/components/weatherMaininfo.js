import styles from './weatherMaininfo.module.css'

export default function WeatherMainInfo({ weather }) {
    return <div className={styles.mainInfo}>
        <div className={styles.city}>{weather?.location.name}</div>
        <div className={styles.country}>{weather?.location.country}</div>
        <div className={styles.row}>
            <div>
                <img src={`https:${weather?.current.condition.icon}`} width="128" alt={<div>{weather?.current.condition.text}</div>} />
            </div>
            <div className={styles.weatherConditions}>
                <div className={styles.condition}>{weather?.current.condition.text}</div>
                <div className={styles.current}>{weather?.current.temp_c}°</div>
            </div>
        </div>
        <div><iframe 
        title="map"
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d104724.58831785276!2d${weather?.location.lon}9!3d${weather?.location.lat}3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1684184247994!5m2!1ses!2sar`} 
        width="100%" height="300px" style={{border:0}} loading="lazy" ></iframe></div>
    </div>
}