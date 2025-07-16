import { useSelector } from 'react-redux'

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <footer className="app-footer">
            <section>
                <p>TBA: Music Player</p>
            </section>
        </footer>
    )
}