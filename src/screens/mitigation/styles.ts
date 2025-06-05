import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eef',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  riskLevel: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  actionsBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  actionItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'column',
    gap: 8,
  },
});

export const getRiskColor = (risco: string | null) => {
  switch (risco) {
    case 'Alto':
      return 'red';
    case 'Moderado':
      return 'orange';
    case 'Baixo':
      return 'green';
    default:
      return '#000';
  }
};
