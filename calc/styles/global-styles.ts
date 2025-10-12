import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
  },

  calculatorContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  mainResult: {
    fontSize: 64,
    textAlign: "right",
    fontWeight: "500",
    fontFamily: "SpaceMono",
    letterSpacing: 1,
    marginBottom: 8,
  },

  subResult: {
    fontSize: 28,
    textAlign: "right",
    fontWeight: "300",
    fontFamily: "SpaceMono",
    opacity: 0.7,
  },

  button: {
    height: 80,
    width: 80,
    borderRadius: 24, // Bordes más suaves
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "500",
    fontFamily: "SpaceMono",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "85%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
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
    fontSize: 16,
    opacity: 0.7,
  },

  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    marginBottom: 50,
  },

  topBarButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  topBarButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },

  topBarSelectedMode: {
    fontWeight: "700",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  resultContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  resultValue: {
    fontSize: 36,
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
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  converterButtonText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
