import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
  },

  calculatorContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    paddingHorizontal: 10,
  },

  mainResult: {
    fontSize: 70,
    textAlign: "right",
    fontWeight: "400",
    fontFamily: "SpaceMono",
  },

  subResult: {
    fontSize: 40,
    textAlign: "right",
    fontWeight: "300",
    fontFamily: "SpaceMono",
  },

  button: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "300",
    fontFamily: "SpaceMono",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  modalButton: {
    width: "100%",
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  modalButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },

  historyModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  historyModalContent: {
    width: "85%",
    maxHeight: "70%",
    borderRadius: 20,
    padding: 20,
  },

  historyModalTextEmpty: {
    textAlign: "center",
  },

  historyModalButtonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  historyModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  topBarButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  topBarButtonText: {
    fontWeight: "600",
  },

  topBarSelectedMode: {
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },

  resultContainer: {
    alignItems: "center",
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
  },

  resultCategory: {
    fontSize: 18,
    marginTop: 5,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    marginTop: 10,
  },

  picker: {
    height: 60,
    width: "100%",
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
    fontWeight: "600",
    textAlign: "center",
  },
});

