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

  historyModalTextEmpty: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  historyModalButtonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  historyModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  historyModalButtonClose: {
    backgroundColor: Colors.lightGray,
    marginRight: 5,
  },

  historyModalButtonClear: {
    backgroundColor: Colors.orange,
    marginLeft: 5,
  },

  historyModalButtonTextClose: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  historyModalButtonTextClear: {
    color: 'white',
    fontWeight: '600',
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

  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },

  resultContainer: {
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
    padding: 20,
    borderRadius: 10,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  resultValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 8,
    color: Colors.textPrimary,
  },

  resultCategory: {
    fontSize: 18,
    marginTop: 5,
    color: Colors.textSecondary,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.textPrimary,
  },

  label: {
    fontSize: 16,
    marginTop: 10,
    color: Colors.textPrimary,
  },

  picker: {
    height: 60,
    width: '100%',
    color: Colors.textPrimary,
    marginBottom: 10, 
  },

  converterButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  converterButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
