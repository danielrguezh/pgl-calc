import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
  },

  mainResult: {
    color: Colors.textPrimary,
    fontSize: 70,
    textAlign: 'right',
    fontWeight: '400',
    fontFamily: 'SpaceMono',
  },

  subResult: {
    color: Colors.textSecondary,
    fontSize: 40,
    textAlign: 'right',
    fontWeight: '300',
  },

  button: {
    height: 80,
    width: 80,
    backgroundColor: Colors.darkGray,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    color: Colors.textPrimary,
    fontWeight: '300',
    fontFamily: 'SpaceMono',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: Colors.backgroundLight,
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: Colors.textPrimary,
  },

  modalButton: {
    width: '100%',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  modalButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },

  historyModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  historyModalContent: {
    backgroundColor: Colors.backgroundLight,
    width: '85%',
    maxHeight: '70%',
    borderRadius: 20,
    padding: 20,
  },

  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  topBarButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  topBarButtonText: {
    color: 'black',
    fontWeight: '600',
  },

  topBarSelectedMode: {
    color: Colors.orange,
    fontWeight: '700',
  },
});
