import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0fdf6',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#004d40',
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  avaliacao: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  avaliacaoTexto: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  riscoAlto: {
    backgroundColor: '#d32f2f',
  },
  riscoModerado: {
    backgroundColor: '#f9a825',
  },
  riscoBaixo: {
    backgroundColor: '#388e3c',
  },
  msgSucesso: {
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDanger: {
    backgroundColor: '#c62828',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
