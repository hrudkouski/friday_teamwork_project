import s from "./Packs.module.css"

export const Packs = () => {

    return (
        <div className={s.packsContainer}>
            <table>
                <thead className={s.packsHeader}>
                    <tr>
                        <th>username</th>
                        <th>name</th>
                        <th>count</th>
                        <th>time</th>
                        <th>cards</th>
                        <th>train</th>
                        <th>operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kolya</td>
                        <td>noName</td>
                        <td>0</td>
                        <td>12:53</td>
                        <td>7</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                    <tr>
                        <td>Kolya</td>
                        <td>noName</td>
                        <td>0</td>
                        <td>12:53</td>
                        <td>7</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                    <tr>
                        <td>Kolya</td>
                        <td>noName</td>
                        <td>0</td>
                        <td>12:53</td>
                        <td>7</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}