import styles from './stats.module.scss';
import Button from '../../shared/uibuttons';
import {BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';


function Stats(props) {
        
    return (
        <div className={styles.stats}> 
      
            <h3>SPENDING DATA</h3>
            <div className={styles.barchart}>
                <BarChart width={330} height={225} barSize={2} barGap={1} data={props.stats} 
                          margin={{top: 5, right: 46, left: -5, bottom: 5,}}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip/>
                    <Bar dataKey="sum" fill="#ff9b3e" />
                </BarChart>
            </div>
        
            <form onSubmit={props.handleStatsSubmit}>
                <div className={styles.stats_feed}>
                    <input type="number" name="sum" required></input>
                    <Button type="submit" secondary >ADD</Button>
                </div>
            </form>
        
            <div className={styles.data_display}>
                <div className={styles.average}>average purchase: {props.average.toFixed(2)}€</div>
                <div className={styles.stats_total}>total money spent: {props.total}€ </div>
            </div>
        
            <div className={styles.reset}>
                <button onClick={props.deleteCollection}>RESET STATS</button>
            </div>
        
        </div>       
    );
}

export default Stats;
