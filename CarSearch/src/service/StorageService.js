import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc
} from "firebase/firestore";

import { db, isFirebaseConfigured } from "./FirebaseConfig";

const HISTORY_KEY = "@carsearch:history:v1";
const LIMIT = 12;

export async function getHistory(userId) {
  if (userId && isFirebaseConfigured && db) {
    return getFirebaseHistory(userId);
  }

  return getLocalHistory();
}

export async function saveHistoryItem(item, userId) {
  const normalized = stripUndefined({
    ...item,
    id: item.id || `${Date.now()}`,
    createdAt: item.createdAt || new Date().toISOString()
  });

  if (userId && isFirebaseConfigured && db) {
    await setDoc(doc(db, "users", userId, "history", normalized.id), normalized);
    return getFirebaseHistory(userId);
  }

  return saveLocalHistoryItem(normalized);
}

export async function clearHistory(userId) {
  if (userId && isFirebaseConfigured && db) {
    const snapshot = await getDocs(collection(db, "users", userId, "history"));
    await Promise.all(snapshot.docs.map((document) => deleteDoc(document.ref)));
    return;
  }

  await clearLocalHistory();
}

async function getFirebaseHistory(userId) {
  const historyRef = collection(db, "users", userId, "history");
  const q = query(historyRef, orderBy("createdAt", "desc"), limit(LIMIT));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}

async function getLocalHistory() {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Erro ao ler histórico local", error);
    return [];
  }
}

async function saveLocalHistoryItem(item) {
  try {
    const current = await getLocalHistory();
    const withoutDuplicate = current.filter((oldItem) => {
      const sameVehicle =
        oldItem.marca === item.marca &&
        oldItem.modelo === item.modelo &&
        oldItem.versao === item.versao;
      return !sameVehicle;
    });

    const next = [item, ...withoutDuplicate].slice(0, LIMIT);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    return next;
  } catch (error) {
    console.warn("Erro ao salvar histórico local", error);
    return [];
  }
}

async function clearLocalHistory() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn("Erro ao limpar histórico local", error);
  }
}

function stripUndefined(value) {
  if (Array.isArray(value)) {
    return value.map(stripUndefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, itemValue]) => itemValue !== undefined)
        .map(([key, itemValue]) => [key, stripUndefined(itemValue)])
    );
  }

  return value;
}
