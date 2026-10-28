import styles from './StateMessage.module.css'

// Mensajes de estado reutilizables: cargando, error (con reintentar) y vacío.
export function Loader() {
  return <p className={styles.message}>Cargando…</p>
}

export function ErrorMessage({ message = 'Algo salió mal.', onRetry }) {
  return (
    <div className={`${styles.message} ${styles.error}`}>
      <p>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message }) {
  return <p className={styles.message}>{message}</p>
}
