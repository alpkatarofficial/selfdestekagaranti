"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  ChevronRight,
  Home,
  Search,
  Shield,
  User,
  ArrowUpRight,
  MessageSquare,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  ArrowRightCircle,
  ThumbsDown,
  Wifi,
  Radio,
  AppWindow,
  Cable,
  Power,
  ShieldAlert,
  Bluetooth,
  MonitorSmartphone,
  HardDrive,
  Clock,
  Smartphone,
  MoreHorizontal,
  Tv,
  Volume2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Logo bileşenini oluşturalım (gerçek logo yerine geçici olarak)
function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="https://www.agaranti.com.tr/wp-content/uploads/2023/02/agaranti-Arena.png"
        alt="A-Garanti Logo"
        width={120}
        height={30}
        className="h-8 w-auto"
      />
    </div>
  )
}

// Sorun giderme veri modeli
// Her sorunun birden fazla çözüm adımı olabilir
type SolutionStep = {
  id: string
  content: string
  isLastStep: boolean
}

type Problem = {
  id: string
  question: string
  category: string
  solutionSteps: SolutionStep[]
  relatedProblems?: string[] // İlgili diğer sorun ID'leri
}

// Yedek parçalar için yeni bir veri modeli ekleyelim
// Mevcut Problem tipinin altına şu kodu ekleyin:

type SparePart = {
  id: string
  productCode: string
  description: string
  compatibleModels: string[]
}

// Sorun veritabanı
const problemsDatabase: Problem[] = [
  {
    id: "thomson1",
    question: "Thomson Smart TV'mdeki girişleri nasıl değiştirebilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson1-1",
        content:
          "Uzaktan kumanda üzerindeki SOURCE (KAYNAK) düğmesine basın ve yukarı/aşağı düğmelerini kullanarak istediğiniz girişe geçin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson2", "thomson16"],
  },
  {
    id: "thomson2",
    question: "Thomson Smart TV'yi çalıştırmak için hangi bağlantılara ihtiyacım var?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson2-1",
        content:
          "Canlı TV programlarını izlemek için Thomson Smart TV'nizin bir uydu veya karasal antene ya da bir kablo ağına bağlı olması gerekir.",
        isLastStep: false,
      },
      {
        id: "thomson2-2",
        content:
          "Tam Smart TV deneyiminin keyfini çıkarmak istiyorsanız, Thomson Smart TV'nizi bir Wi-Fi veya LAN kablosu aracılığıyla İnternet'e bağlamanız gerekir.",
        isLastStep: false,
      },
      {
        id: "thomson2-3",
        content:
          "Ses cihazları ve USB cihazları gibi isteğe bağlı bağlantılar hakkında bilgi için lütfen kurulum kılavuzuna veya kullanım kılavuzuna bakın.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson3", "thomson16"],
  },
  {
    id: "thomson3",
    question: "Thomson Smart TV'mde bir USB sürücüdeki medya dosyalarını nasıl oynatabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson3-1",
        content: "Thomson Smart TV'nin USB bağlantı noktasına harici bir USB sürücü bağlayın.",
        isLastStep: false,
      },
      {
        id: "thomson3-2",
        content: "Önceden yüklenmiş multimedya oynatıcı uygulaması MMP'yi açın ve oynatmak istediğiniz dosyayı seçin.",
        isLastStep: false,
      },
      {
        id: "thomson3-3",
        content: "Oynatmayı başlatmak için OK düğmesine basın.",
        isLastStep: false,
      },
      {
        id: "thomson3-4",
        content:
          "Multimedya dosyalarını oynatmak için önceden yüklenmiş MMP multimedya oynatıcıyı kullanabilir veya Google Play'den başka bir multimedya oynatıcı indirebilirsiniz.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson13", "thomson15"],
  },
  {
    id: "thomson4",
    question: "Thomson Smart TV'min depolama kapasitesini artırabilir miyim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson4-1",
        content:
          "Evet, harici depolama alanı olarak kullanmak için bir USB bellek veya sabit sürücü bağlayıp takarak depolama kapasitesini artırabilirsiniz.",
        isLastStep: false,
      },
      {
        id: "thomson4-2",
        content: "Harici belleğe yalnızca birkaç uygulamanın taşınabileceğini lütfen unutmayın.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson13", "thomson15"],
  },
  {
    id: "thomson5",
    question: "Google Asistan'ı nasıl kullanabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson5-1",
        content:
          '"OK Google" işlevini kullanmak istiyorsanız, uzaktan kumanda üzerindeki Google Asistan düğmesine basın.',
        isLastStep: false,
      },
      {
        id: "thomson5-2",
        content:
          'Google Asistan düğmesine ilk kez bastığınızda, ekranda "OK Google" işlevini etkinleştirmeniz istenecektir.',
        isLastStep: false,
      },
      {
        id: "thomson5-3",
        content:
          "Bu işlev çeşitli bilgileri, multimedya içeriklerini veya videoları doğrudan Android TV ana ekranında aramanızı sağlar.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson16", "thomson19"],
  },
  {
    id: "thomson6",
    question:
      "Bazen uygulamam (Netflix, Prime Video vb.) normal şekilde başlamıyor veya 'Oynatma şu anda mümkün değil' mesajını görüntülüyor. Bu sorunu nasıl çözebilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson6-1",
        content:
          "Belirli uygulamaların aynı kimlik bilgileriyle eşzamanlı kullanımı belirli sayıda cihazla sınırlı olabilir. Lütfen bu uygulamayı diğer cihazlarda kapatın ve uygulamayı Thomson Smart TV'de tekrar açmayı deneyin.",
        isLastStep: false,
      },
      {
        id: "thomson6-2",
        content:
          "İsteğe bağlı çok kullanıcılı uygulamada oturum açmak için lütfen doğru kullanıcıyı seçtiğinizden emin olun.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson11", "thomson23"],
  },
  {
    id: "thomson7",
    question: "Google hesabımı nereye girebilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson7-1",
        content:
          "İlk kurulum sırasında Google hesabınızla oturum açmadıysanız, daha sonra Ayarlar / Hesaplar ve oturum açma menüsünden de oturum açabilirsiniz.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson16", "thomson20"],
  },
  {
    id: "thomson8",
    question: "Yazılım güncellemesini nasıl yaparım?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson8-1",
        content: "Thomson Smart TV'niz için yazılım güncellemeleri otomatik olarak gerçekleştirilir.",
        isLastStep: false,
      },
      {
        id: "thomson8-2",
        content:
          "Yüklü uygulamalar için güncellemeler mevcut olduğunda, ana ekranda bir bildirim alırsınız. Bu bildirime gidin ve okumak için Tamam düğmesine basın.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson24", "thomson16"],
  },
  {
    id: "thomson9",
    question: "Kullanabileceğim bir internet tarayıcısı var mı?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson9-1",
        content: "Evet, ancak Google Play Store'dan bir tarayıcı uygulaması indirmeniz gerekiyor.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson20", "thomson24"],
  },
  {
    id: "thomson10",
    question: "Thomson Smart TV'm için garanti koşulları nelerdir?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson10-1",
        content:
          "Tüm ürünlerimiz için üç yıllık garanti süresi sunuyoruz. Bu nedenle Thomson Smart TV'nizin garanti süresi satın alma tarihinden itibaren 24 aydır.",
        isLastStep: true,
      },
    ],
    relatedProblems: [],
  },
  {
    id: "thomson11",
    question: "Seçilen uygulama başlamıyor veya başlaması çok uzun sürüyor. Bu hatayı nasıl düzeltebilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson11-1",
        content:
          'Uygulamayı yeniden başlatmak için iptal edin. Bunu yapmak için şuraya gidin: Ayarlar / Uygulamalar / "Uygulama adı" / Durdurmaya zorla.',
        isLastStep: false,
      },
      {
        id: "thomson11-2",
        content:
          'Önbelleği silin: Önbelleğinizi silin. Bu seçeneği şurada bulabilirsiniz: Ayarlar / Uygulamalar / "Uygulama adı" / Önbelleği temizle.',
        isLastStep: false,
      },
      {
        id: "thomson11-3",
        content: 'Çalışmayan uygulamayı kaldırın. Şuraya gidin: Ayarlar / Uygulamalar / "Uygulama adı" / Kaldır.',
        isLastStep: false,
      },
      {
        id: "thomson11-4",
        content: "Kaldırdıktan sonra, uygulamayı Google Play Store'dan yeniden yükleyin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson6", "thomson23"],
  },
  {
    id: "thomson12",
    question: "Cep telefonuma yüklediğim bazı uygulamalar Google Play Store'da bulunamıyor. Neden böyle oldu?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson12-1",
        content:
          "TV seti Android TV ile çalıştırılır. Akıllı telefonlar için Google Play Store, Android TV'ler için olanla aynı değildir. Bazı uygulamalar yalnızca akıllı telefonlar için Google Play Store'da mevcuttur.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson24", "thomson20"],
  },
  {
    id: "thomson13",
    question: "Thomson TV'm hangi USB formatlarını destekliyor?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson13-1",
        content: "Thomson Smart TV'ler FAT32 ve NTFS formatlarını destekler. ExFAT desteklenmez.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson3", "thomson4"],
  },
  {
    id: "thomson14",
    question: "Wi-Fi bağlantım sürekli kopuyor. Ne yapabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson14-1",
        content:
          "Bu hata Wi-Fi sinyalinin zayıf olduğunu gösteriyor olabilir. Cihazın yönlendiriciden çok uzakta olmadığından emin olun.",
        isLastStep: false,
      },
      {
        id: "thomson14-2",
        content:
          "Yönlendiriciyi yeniden başlatın ve Thomson cihazınızı elektrik fişinden çekerek sıfırlayın. Gücü tekrar takmadan önce 1 dakika bekleyin.",
        isLastStep: false,
      },
      {
        id: "thomson14-3",
        content:
          "Ayarlar menüsünden Wi-Fi bağlantısını kesip yeniden bağlayın: Ayarlar > Ağ > Ağınızı seçin > Ağı unut",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson2", "thomson16"],
  },
  {
    id: "thomson15",
    question: "Televizyonuma kaydettiğim TV programlarını nasıl oynatabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson15-1",
        content: "Lütfen Canlı TV uygulamasını açın.",
        isLastStep: false,
      },
      {
        id: "thomson15-2",
        content: "Menü düğmesine basın, Kayıt listesine gidin ve Kaydedilen programı seçin.",
        isLastStep: false,
      },
      {
        id: "thomson15-3",
        content: "Oynatmayı başlatmak için OK düğmesine basın.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson3"],
  },
  {
    id: "thomson16",
    question: "Google Asistan çalışmıyor. Ne yapabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson16-1",
        content: "Uzaktan kumandanız Thomson Smart TV ile eşleştirilmemiş olabilir.",
        isLastStep: false,
      },
      {
        id: "thomson16-2",
        content:
          "Uzaktan kumandanın TV ile eşleştirilip eşleştirilmediğini kontrol etmek için Ayarlar / Uzaktan kumandalar ve aksesuarlar menüsüne gidin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson17"],
  },
  {
    id: "thomson17",
    question: "Bluetooth uzaktan kumandayı Smart TV ile nasıl eşleştirebilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson17-1",
        content: "Ayarlar / Uzaktan kumanda ve aksesuarlar / Aksesuar ekle menüsünü açın ve OK düğmesine basın.",
        isLastStep: false,
      },
      {
        id: "thomson17-2",
        content:
          "Ardından, kırmızı LED yanıp sönmeye başlayana kadar uzaktan kumandanızdaki Ses Azaltma (-) düğmesine ve Geri (<) düğmesine aynı anda basın.",
        isLastStep: false,
      },
      {
        id: "thomson17-3",
        content:
          "TV ekranınızın üst kısmında görüntülenen listeden THOMSON RCU'yu seçin ve eşleştirme işlemini başlatmak için OK düğmesine basın.",
        isLastStep: false,
      },
      {
        id: "thomson17-4",
        content:
          "Eşleştirme işlemi tamamlandığında ve uzaktan kumandanız TV ile başarıyla eşleştirildiğinde, bu menüden çıkmak için Çıkış düğmesine basın.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson16", "thomson18"],
  },
  {
    id: "thomson18",
    question: "Bluetooth cihazlarını Thomson Smart TV'me nasıl bağlayabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson18-1",
        content: "Ayarlar / Uzaktan kumandalar ve aksesuarlar / Aksesuar ekle menüsüne gidin / OK tuşuna basın.",
        isLastStep: false,
      },
      {
        id: "thomson18-2",
        content: "Bluetooth araması başlayacak ve TV ekranınızda mevcut cihazların bir listesi görüntülenecektir.",
        isLastStep: false,
      },
      {
        id: "thomson18-3",
        content:
          'Not: Bağlamak istediğiniz cihazın "Eşleştirme" veya "Keşif" moduna ayarlı olduğundan emin olun. Cihazı "Eşleştirme" moduna nasıl ayarlayacağınızı öğrenmek için lütfen Bluetooth cihazının kullanım kılavuzuna bakın.',
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson17", "thomson19"],
  },
  {
    id: "thomson19",
    question: "Thomson Smart TV'me hangi Bluetooth cihazlarını bağlayabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson19-1",
        content:
          "Kulaklık ve hoparlör gibi ses cihazlarının yanı sıra klavye veya oyun kumandası gibi giriş cihazlarını Bluetooth aracılığıyla Thomson Smart TV'ye bağlayabilirsiniz.",
        isLastStep: false,
      },
      {
        id: "thomson19-2",
        content: "Aynı anda bağlanan çok sayıda cihazın birbirlerinin işlevselliğini bozabileceğini lütfen unutmayın.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson18", "thomson17"],
  },
  {
    id: "thomson20",
    question: "Android'li Thomson Smart TV'm ile neler yapabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson20-1",
        content:
          "Binlerce film ve TV şovunu izleyebilir, oyun oynayabilir, müzik dinleyebilir ve Google Play Store'dan 7000'den fazla uygulamaya erişebilirsiniz.",
        isLastStep: false,
      },
      {
        id: "thomson20-2",
        content: "Ayrıca geleneksel bir kablo, karasal yayın veya uydu anteni aracılığıyla canlı TV izleyebilirsiniz.",
        isLastStep: false,
      },
      {
        id: "thomson20-3",
        content:
          "Smart TV'nizin özelliklerine ayrıntılı bir genel bakış için lütfen resmi Thomson web sitesini ziyaret edin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson9", "thomson24"],
  },
  {
    id: "thomson21",
    question: "Uzaktan kumandamda arka ışığı nasıl açıp kapatabilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson21-1",
        content: "OK düğmesine 5 saniye boyunca basarak arka ışığı açıp kapatabilirsiniz.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson17", "thomson16"],
  },
  {
    id: "thomson22",
    question: "Thomson Smart TV'mde hangi tunerler var?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson22-1",
        content: "Thomson Smart TV'ler aşağıdaki tunerlere sahiptir: DVB-T2/S2/C.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson2"],
  },
  {
    id: "thomson23",
    question: "Uygulamaları nasıl yükleyebilirim?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson23-1",
        content: "Google Play'den uygulama indirmek için bir Google Hesabı ile oturum açmış olmanız gerekir.",
        isLastStep: false,
      },
      {
        id: "thomson23-2",
        content:
          "İlk kurulum sırasında bir Google Hesabı girmediyseniz, Thomson Smart TV'nizin ana ekranında Google Play Store uygulamasını ilk kez açtığınızda Google Hesabı oturum açma işlemine yönlendirileceksiniz.",
        isLastStep: false,
      },
      {
        id: "thomson23-3",
        content:
          "Thomson Smart TV'nizin ana ekranında Google Play Store uygulamasını açın, uygulamaları arayın ve istediğiniz uygulamaları indirin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson12", "thomson11"],
  },
  {
    id: "thomson24",
    question: "Thomson Smart TV'de önceden yüklenmiş uygulamalar var mı?",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson24-1",
        content:
          "Önceden yüklenmiş uygulamalar arasında Netflix, YouTube, Google Play, Google Movie, Google Music, Google Game ve daha fazlası yer alıyor.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson20", "thomson23"],
  },
  // Mevcut veritabanı sorunlarını korumak için burada tutuyorum
  {
    id: "p1",
    question: "Cihazım açılmıyor",
    category: "technical",
    solutionSteps: [
      {
        id: "s1-1",
        content: "Cihazınızın güç kablosunun prize takılı olduğundan emin olun.",
        isLastStep: false,
      },
      {
        id: "s1-2",
        content: "Güç düğmesine basın ve 10 saniye bekleyin.",
        isLastStep: false,
      },
      {
        id: "s1-3",
        content: "Farklı bir prize takmayı deneyin.",
        isLastStep: false,
      },
      {
        id: "s1-4",
        content: "Cihazı kapatıp, fişini çekin. 1 dakika bekledikten sonra tekrar prize takıp açmayı deneyin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["p2", "p3"],
  },
  {
    id: "p2",
    question: "Cihazım ara sıra kapanıyor",
    category: "technical",
    solutionSteps: [
      {
        id: "s2-1",
        content: "Cihazınızın havalandırma kanallarının toz veya engel olmadan açık olduğundan emin olun.",
        isLastStep: false,
      },
      {
        id: "s2-2",
        content:
          "Cihazınızın aşırı ısınıp ısınmadığını kontrol edin. Sıcaksa, soğuması için kapatın ve bir süre bekleyin.",
        isLastStep: false,
      },
      {
        id: "s2-3",
        content: "Yazılım güncellemelerini kontrol edin ve varsa güncellemeleri yükleyin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["p1", "p4"],
  },
  {
    id: "p3",
    question: "Cihazım ses çıkarmıyor",
    category: "technical",
    solutionSteps: [
      {
        id: "s3-1",
        content: "Ses seviyesinin açık ve yeterince yüksek olduğundan emin olun.",
        isLastStep: false,
      },
      {
        id: "s3-2",
        content: "Hoparlör veya kulaklık bağlantılarını kontrol edin.",
        isLastStep: false,
      },
      {
        id: "s3-3",
        content: "Cihazı yeniden başlatın ve ses ayarlarını kontrol edin.",
        isLastStep: false,
      },
      {
        id: "s3-4",
        content: "Farklı bir ses kaynağı (video, müzik) ile test edin.",
        isLastStep: true,
      },
    ],
  },
  {
    id: "p4",
    question: "Cihazım çok yavaş çalışıyor",
    category: "technical",
    solutionSteps: [
      {
        id: "s4-1",
        content: "Cihazınızı yeniden başlatın.",
        isLastStep: false,
      },
      {
        id: "s4-2",
        content: "Arka planda çalışan uygulamaları kapatın.",
        isLastStep: false,
      },
      {
        id: "s4-3",
        content: "Depolama alanınızı kontrol edin, gerekirse eski ve kullanılmayan dosyaları temizleyin.",
        isLastStep: false,
      },
      {
        id: "s4-4",
        content: "Yazılım güncellemelerini kontrol edin ve varsa güncellemeleri yükleyin.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["p2"],
  },
  {
    id: "p5",
    question: "Faturamı göremiyorum",
    category: "payment",
    solutionSteps: [
      {
        id: "s5-1",
        content: "Hesabınıza giriş yaptığınızdan emin olun.",
        isLastStep: false,
      },
      {
        id: "s5-2",
        content: "'Faturalarım' veya 'Siparişlerim' bölümüne gidin.",
        isLastStep: false,
      },
      {
        id: "s5-3",
        content: "İlgili tarihi seçerek faturanızı arayın.",
        isLastStep: false,
      },
      {
        id: "s5-4",
        content: "Tarayıcınızın önbelleğini temizleyin ve tekrar deneyin.",
        isLastStep: true,
      },
    ],
  },
  {
    id: "p6",
    question: "Şifremi unuttum",
    category: "account",
    solutionSteps: [
      {
        id: "s6-1",
        content: "Giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayın.",
        isLastStep: false,
      },
      {
        id: "s6-2",
        content: "Kayıtlı e-posta adresinizi girin.",
        isLastStep: false,
      },
      {
        id: "s6-3",
        content: "E-postanıza gelen şifre sıfırlama bağlantısına tıklayın.",
        isLastStep: false,
      },
      {
        id: "s6-4",
        content: "Yeni bir şifre belirleyin ve kaydedin.",
        isLastStep: true,
      },
    ],
  },
  {
    id: "p7",
    question: "Garanti sürem ne zaman bitiyor?",
    category: "products",
    solutionSteps: [
      {
        id: "s7-1",
        content: "Hesabınıza giriş yapın ve 'Ürünlerim' bölümüne gidin.",
        isLastStep: false,
      },
      {
        id: "s7-2",
        content: "İlgili ürünü seçin ve detaylarını görüntüleyin.",
        isLastStep: false,
      },
      {
        id: "s7-3",
        content: "Garanti bilgileri ürün detaylarında listelenmektedir.",
        isLastStep: false,
      },
      {
        id: "s7-4",
        content: "Garanti belgenizi veya satın alma faturanızı kontrol edin.",
        isLastStep: true,
      },
    ],
  },
  {
    id: "p8",
    question: "Ödeme yaparken hata alıyorum",
    category: "payment",
    solutionSteps: [
      {
        id: "s8-1",
        content: "Kart bilgilerinizin doğru girildiğinden emin olun.",
        isLastStep: false,
      },
      {
        id: "s8-2",
        content: "Kartınızın internet alışverişine açık olduğundan emin olun.",
        isLastStep: false,
      },
      {
        id: "s8-3",
        content: "Farklı bir tarayıcı veya cihaz kullanmayı deneyin.",
        isLastStep: false,
      },
      {
        id: "s8-4",
        content: "Bankanızla iletişime geçerek kartınızın durumunu kontrol edin.",
        isLastStep: true,
      },
    ],
  },
  // Also update the product information in the problemsDatabase for the Thomson TV models
  // Find and update the thomson-32FA2S13 entry
  {
    id: "thomson-32FA2S13",
    question: '32FA2S13 - 32" Android Smart Led TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-32FA2S13-1",
        content:
          "32FA2S13 modeli, 32 inç ekran boyutuna sahip, Android Smart Led TV'dir. Bu model Android işletim sistemi ile çalışır ve çeşitli akıllı TV özelliklerine sahiptir.",
        isLastStep: false,
      },
      {
        id: "thomson-32FA2S13-2",
        content: "Teknik özellikleri: 32 inç ekran, HD çözünürlük, Android işletim sistemi, dahili uydu alıcısı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson1", "thomson2", "thomson3"],
  },

  // Find and update the thomson-32HA2S13W-HD entry
  {
    id: "thomson-32HA2S13W-HD",
    question: '32HA2S13W-HD - 32" Android Smart Led TV Beyaz hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-32HA2S13W-HD-1",
        content:
          "32HA2S13W-HD modeli, 32 inç ekran boyutuna sahip, beyaz renkli, HD çözünürlüklü Android Smart TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-32HA2S13W-HD-2",
        content: "Teknik özellikleri: 32 inç ekran, HD çözünürlük, Android işletim sistemi, beyaz gövde tasarımı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson1", "thomson2", "thomson3"],
  },

  // Find and update the thomson-40FA2S13 entry
  {
    id: "thomson-40FA2S13",
    question: '40FA2S13 - 40" Android Smart Led TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-40FA2S13-1",
        content: "40FA2S13 modeli, 40 inç ekran boyutuna sahip, Android Smart Led TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-40FA2S13-2",
        content: "Teknik özellikleri: 40 inç ekran, Full HD çözünürlük, Android işletim sistemi, dahili uydu alıcısı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson1", "thomson2", "thomson3"],
  },
  {
    id: "thomson-40FG2S14",
    question: '40FG2S14 - 40" FHD Google TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-40FG2S14-1",
        content:
          "40FG2S14 modeli, 40 inç ekran boyutuna sahip, Google TV işletim sistemli, Full HD çözünürlüklü Smart TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-40FG2S14-2",
        content:
          "Teknik özellikleri: 40 inç ekran, Full HD çözünürlük, Google TV işletim sistemi, gelişmiş akıllı TV özellikleri.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-43FG2S14",
    question: '43FG2S14 - 43" Google Smart Led TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-43FG2S14-1",
        content: "43FG2S14 modeli, 43 inç ekran boyutuna sahip, Google Smart Led TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-43FG2S14-2",
        content:
          "Teknik özellikleri: 43 inç ekran, Full HD çözünürlük, Google TV işletim sistemi, dahili uydu alıcısı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-50UG4S14",
    question: '50UG4S14 - 50" Google Smart Led TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-50UG4S14-1",
        content: "50UG4S14 modeli, 50 inç ekran boyutuna sahip, Google Smart Led TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-50UG4S14-2",
        content: "Teknik özellikleri: 50 inç ekran, 4K UHD çözünürlük, Google TV işletim sistemi, dahili uydu alıcısı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-55OG9C14",
    question: '55OG9C14 - 55" Lucid OLED TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-55OG9C14-1",
        content: "55OG9C14 modeli, 55 inç ekran boyutuna sahip, Lucid OLED ekran teknolojisine sahip TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-55OG9C14-2",
        content:
          "Teknik özellikleri: 55 inç OLED ekran, 4K UHD çözünürlük, Google TV işletim sistemi, üstün görüntü kalitesi.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-55QG6C14",
    question: '55QG6C14 - 55" Google QLED Plus TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-55QG6C14-1",
        content: "55QG6C14 modeli, 55 inç ekran boyutuna sahip, QLED Plus ekran teknolojisine sahip Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-55QG6C14-2",
        content:
          "Teknik özellikleri: 55 inç QLED Plus ekran, 4K UHD çözünürlük, Google TV işletim sistemi, gelişmiş renk ve kontrast.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-55UG5C14",
    question: '55UG5C14 - 55" Google UHD TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-55UG5C14-1",
        content: "55UG5C14 modeli, 55 inç ekran boyutuna sahip, UHD çözünürlüklü Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-55UG5C14-2",
        content:
          "Teknik özellikleri: 55 inç ekran, 4K UHD çözünürlük, Google TV işletim sistemi, akıllı TV özellikleri.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-65OG8C14",
    question: '65OG8C14 - 65" Google OLED TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-65OG8C14-1",
        content: "65OG8C14 modeli, 65 inç ekran boyutuna sahip, OLED ekran teknolojisine sahip Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-65OG8C14-2",
        content:
          "Teknik özellikleri: 65 inç OLED ekran, 4K UHD çözünürlük, Google TV işletim sistemi, üstün görüntü kalitesi ve kontrast.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-65QG5C14",
    question: '65QG5C14 - 65" Google OLED TV2 hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-65QG5C14-1",
        content: "65QG5C14 modeli, 65 inç ekran boyutuna sahip, OLED ekran teknolojisine sahip Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-65QG5C14-2",
        content:
          "Teknik özellikleri: 65 inç OLED ekran, 4K UHD çözünürlük, Google TV işletim sistemi, canlı renkler ve yüksek kontrast.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-65UG4S14",
    question: '65UG4S14 - 65" Google UHD TV Side Feet hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-65UG4S14-1",
        content: "65UG4S14 modeli, 65 inç ekran boyutuna sahip, UHD çözünürlüklü, yan ayaklı Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-65UG4S14-2",
        content: "Teknik özellikleri: 65 inç ekran, 4K UHD çözünürlük, Google TV işletim sistemi, yan ayaklı tasarım.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-75QG5C14",
    question: '75QG5C14 - 75" Google TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-75QG5C14-1",
        content: "75QG5C14 modeli, 75 inç ekran boyutuna sahip, Google TV işletim sistemli Smart TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-75QG5C14-2",
        content:
          "Teknik özellikleri: 75 inç ekran, 4K UHD çözünürlük, Google TV işletim sistemi, geniş ekran deneyimi.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-75QG7C14",
    question: '75QG7C14 - 75" Google QLED Pro TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-75QG7C14-1",
        content: "75QG7C14 modeli, 75 inç ekran boyutuna sahip, QLED Pro ekran teknolojisine sahip Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-75QG7C14-2",
        content:
          "Teknik özellikleri: 75 inç QLED Pro ekran, 4K UHD çözünürlük, Google TV işletim sistemi, üstün görüntü kalitesi ve geniş ekran deneyimi.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-77OG8C14",
    question: '77OG8C14 - 77" Google OLED TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-77OG8C14-1",
        content: "77OG8C14 modeli, 77 inç ekran boyutuna sahip, OLED ekran teknolojisine sahip Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-77OG8C14-2",
        content:
          "Teknik özellikleri: 77 inç OLED ekran, 4K UHD çözünürlük, Google TV işletim sistemi, üstün görüntü kalitesi ve geniş ekran deneyimi.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-85QG5S14",
    question: '85QG5S14 - 85" Google QLED TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-85QG5S14-1",
        content: "85QG5S14 modeli, 85 inç ekran boyutuna sahip, QLED ekran teknolojisine sahip Google TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-85QG5S14-2",
        content:
          "Teknik özellikleri: 85 inç QLED ekran, 4K UHD çözünürlük, Google TV işletim sistemi, ultra geniş ekran deneyimi.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson9"],
  },
  {
    id: "thomson-GOOGLE-TV-SOFTWARE",
    question: "GOOGLE-TV-SOFTWARE - Software for Thomson Google TV hakkında bilgi",
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-GOOGLE-TV-SOFTWARE-1",
        content: "GOOGLE-TV-SOFTWARE, Thomson Google TV modelleri için yazılım güncellemesi ve sistem yazılımıdır.",
        isLastStep: false,
      },
      {
        id: "thomson-GOOGLE-TV-SOFTWARE-2",
        content:
          "Bu yazılım, Google TV işletim sistemini çalıştıran Thomson TV'lerin tüm akıllı özelliklerini ve uygulamalarını destekler.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson5", "thomson7", "thomson8", "thomson9"],
  },
  // Update the product information in the problemsDatabase for the Thomson TV models
  // Find and update the thomson-32HD5506 entry
  {
    id: "thomson-32HD5506",
    question: '32HD5506 - 32" HD ANDROID TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-32HD5506-1",
        content:
          "32HD5506 modeli, 32 inç ekran boyutuna sahip, HD çözünürlüklü Android Smart TV'dir. Bu model Android işletim sistemi ile çalışır ve çeşitli akıllı TV özelliklerine sahiptir.",
        isLastStep: false,
      },
      {
        id: "thomson-32HD5506-2",
        content: "Teknik özellikleri: 32 inç ekran, HD çözünürlük, Android işletim sistemi, dahili uydu alıcısı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson1", "thomson2", "thomson3"],
  },

  // Find and update the thomson-32HD5506W entry
  {
    id: "thomson-32HD5506W",
    question: '32HD5506W - 32" HD ANDROID TV - BEYAZ hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-32HD5506W-1",
        content: "32HD5506W modeli, 32 inç ekran boyutuna sahip, beyaz renkli, HD çözünürlüklü Android Smart TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-32HD5506W-2",
        content: "Teknik özellikleri: 32 inç ekran, HD çözünürlük, Android işletim sistemi, beyaz gövde tasarımı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson1", "thomson2", "thomson3"],
  },

  // Find and update the thomson-40FD5506 entry
  {
    id: "thomson-40FD5506",
    question: '40FD5506 - 40" FULL HD ANDROID TV hakkında bilgi',
    category: "thomson",
    solutionSteps: [
      {
        id: "thomson-40FD5506-1",
        content: "40FD5506 modeli, 40 inç ekran boyutuna sahip, Full HD çözünürlüklü Android Smart TV'dir.",
        isLastStep: false,
      },
      {
        id: "thomson-40FD5506-2",
        content: "Teknik özellikleri: 40 inç ekran, Full HD çözünürlük, Android işletim sistemi, dahili uydu alıcısı.",
        isLastStep: true,
      },
    ],
    relatedProblems: ["thomson1", "thomson2", "thomson3"],
  },
]

// Yedek parçalar veritabanını ekleyelim
// problemsDatabase dizisinin tanımlanmasından sonra şu kodu ekleyin:

// Yedek parçalar veritabanı
const sparePartsDatabase: SparePart[] = [
  {
    id: "mainboard-32",
    productCode: "MAINBOARD-32",
    description: "32HG2S14 ANAKART Thomson",
    compatibleModels: ["32HG2S14"],
  },
  {
    id: "mainboard-40",
    productCode: "MAINBOARD-40",
    description: "40FG2S14 ANAKART Thomson",
    compatibleModels: ["40FG2S14"],
  },
  {
    id: "mainboard-43",
    productCode: "MAINBOARD-43",
    description: "43FG2S14 ANAKART Thomson",
    compatibleModels: ["43FG2S14"],
  },
  {
    id: "mainboard-50",
    productCode: "MAINBOARD-50",
    description: "50UG4S14 ANAKART Thomson",
    compatibleModels: ["50UG4S14"],
  },
  {
    id: "mainboard-55",
    productCode: "MAINBOARD-55",
    description: "55UG5C14 ANAKART Thomson",
    compatibleModels: ["55UG5C14"],
  },
  {
    id: "mainboard-55-",
    productCode: "MAINBOARD-55-",
    description: "55QG6C14 ANAKART Thomson",
    compatibleModels: ["55QG6C14"],
  },
  {
    id: "mainboard-65",
    productCode: "MAINBOARD-65",
    description: "65UG4S14 ANAKART Thomson",
    compatibleModels: ["65UG4S14"],
  },
  {
    id: "mainboard-65-",
    productCode: "MAINBOARD-65-",
    description: "65QG5C14 ANAKART Thomson",
    compatibleModels: ["65QG5C14"],
  },
  {
    id: "mainboard-75",
    productCode: "MAINBOARD-75",
    description: "75QG5C14 ANAKART Thomson",
    compatibleModels: ["75QG5C14"],
  },
  {
    id: "mainboard-75-",
    productCode: "MAINBOARD-75-",
    description: "75QG7C14 ANAKART Thomson",
    compatibleModels: ["75QG7C14"],
  },
  {
    id: "mainboard-85",
    productCode: "MAINBOARD-85",
    description: "85QG5S14 ANAKART Thomson",
    compatibleModels: ["85QG5S14"],
  },
  {
    id: "panel-32",
    productCode: "PANEL-32",
    description: "32HG2S14 PANEL Thomson",
    compatibleModels: ["32HG2S14"],
  },
  {
    id: "panel-40",
    productCode: "PANEL-40",
    description: "40FG2S14 PANEL Thomson",
    compatibleModels: ["40FG2S14"],
  },
  {
    id: "panel-43",
    productCode: "PANEL-43",
    description: "43FG2S14 PANEL Thomson",
    compatibleModels: ["43FG2S14"],
  },
  {
    id: "panel-50",
    productCode: "PANEL-50",
    description: "50UG4S14 PANEL Thomson",
    compatibleModels: ["50UG4S14"],
  },
  {
    id: "panel-55",
    productCode: "PANEL-55",
    description: "55UG5C14 PANEL Thomson",
    compatibleModels: ["55UG5C14"],
  },
  {
    id: "panel-55-",
    productCode: "PANEL-55-",
    description: "55QG6C14 PANEL Thomson",
    compatibleModels: ["55QG6C14"],
  },
  {
    id: "panel-65",
    productCode: "PANEL-65",
    description: "65UG4S14 PANEL Thomson",
    compatibleModels: ["65UG4S14"],
  },
  {
    id: "panel-65-",
    productCode: "PANEL-65-",
    description: "65QG5C14 PANEL Thomson",
    compatibleModels: ["65QG5C14"],
  },
  {
    id: "panel-75",
    productCode: "PANEL-75",
    description: "75QG5C14 PANEL Thomson",
    compatibleModels: ["75QG5C14"],
  },
  {
    id: "panel-75-",
    productCode: "PANEL-75-",
    description: "75QG7C14 PANEL Thomson",
    compatibleModels: ["75QG7C14"],
  },
  {
    id: "panel-85",
    productCode: "PANEL-85",
    description: "85QG5S14 PANEL Thomson",
    compatibleModels: ["85QG5S14"],
  },
  {
    id: "tv-accessories",
    productCode: "TV-ACCESSORIES",
    description: "Assembly parts for TV",
    compatibleModels: [
      "32HG2S14",
      "40FG2S14",
      "43FG2S14",
      "50UG4S14",
      "55UG5C14",
      "55QG6C14",
      "65UG4S14",
      "65QG5C14",
      "75QG5C14",
      "75QG7C14",
      "85QG5S14",
    ],
  },
]

// Update the faqCategories with more realistic data based on the example site
const faqCategories = [
  {
    id: "sandisk",
    title: "Sandisk Yardım Kategorileri",
    icon: <HardDrive className="h-6 w-6" />,
    image: "/images/sandisk.jpg",
    faqs: [
      {
        id: "sandisk-1",
        question: "Sandisk ürünümle ilgili teknik destek nasıl alabilirim?",
        answer: "Sandisk ürünleri için destek ve yardım almak için bu kategoriyi kullanabilirsiniz.",
        category: "sandisk",
      },
      // Diğer Sandisk soruları buraya eklenebilir
    ],
  },
  {
    id: "dreame",
    title: "Dreame Ürünleri Desteği",
    icon: <Home className="h-6 w-6" />, // Geçici bir ikon, daha uygun bir ikon bulunabilir
    image: "/images/dreame-hero-banner.webp", // Dreame ana banner görseli
    faqs: [
      {
        id: 501,
        question: "Dreame robot süpürgemin haritalandırması neden kayboldu?",
        answer:
          "Haritalandırma kaybolduysa, cihazın şarj istasyonundan uzaklaşmış veya istasyonun yeri değişmiş olabilir. Cihazı şarj istasyonuna geri götürün ve yeniden haritalandırmayı deneyin. Uygulama üzerinden haritayı sıfırlayıp yeniden oluşturmak da bir çözüm olabilir.",
        category: "dreame",
      },
      {
        id: 502,
        question: "Dreame dikey süpürgemin emiş gücü azaldı, ne yapmalıyım?",
        answer:
          "Emiş gücü azaldıysa, filtrelerin tıkalı olup olmadığını kontrol edin ve temizleyin. Fırça rulosunda saç veya kir birikintisi olup olmadığını kontrol edin ve temizleyin. Toz haznesinin dolu olmadığından emin olun.",
        category: "dreame",
      },
      {
        id: 503,
        question: "Dreame saç kurutma makinem neden ısınmıyor?",
        answer:
          "Cihazın fişinin tam takılı olduğundan emin olun. Isı ayarlarını kontrol edin. Cihazın hava giriş ve çıkışlarının tıkalı olmadığından emin olun. Aşırı ısınma koruması devreye girmiş olabilir, cihazı bir süre dinlendirin.",
        category: "dreame",
      },
      {
        id: 504,
        question: "Dreame hava temizleyicimin filtresini ne zaman değiştirmeliyim?",
        answer:
          "Hava temizleyicinizin filtresi genellikle kullanım sıklığına ve hava kalitesine bağlı olarak 6-12 ayda bir değiştirilmelidir. Cihazın mobil uygulamasından veya üzerindeki göstergeden filtre ömrünü takip edebilirsiniz.",
        category: "dreame",
      },
      {
        id: 505,
        question: "Dreame robot süpürgemin paspaslama performansı düşük, nasıl iyileştirebilirim?",
        answer:
          "Paspas pedlerinin temiz olduğundan ve doğru takıldığından emin olun. Su tankının dolu olduğunu ve su akış ayarının yeterli olduğunu kontrol edin. Paspas pedlerini düzenli olarak yıkayın veya değiştirin.",
        category: "dreame",
      },
    ],
  },
  {
    id: "setup",
    title: "Kurulum ve İlk Ayarlar",
    icon: <Settings className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Kurulum-ve-Ilk-Ayarlar.jpg",
    faqs: [
      {
        id: 101,
        question: "Thomson Smart TV'yi çalıştırmak için hangi bağlantılara ihtiyacım var?",
        answer:
          "Canlı TV programlarını izlemek için Thomson Smart TV'nizin bir uydu veya karasal antene ya da bir kablo ağına bağlı olması gerekir. Tam Smart TV deneyiminin keyfini çıkarmak istiyorsanız, Thomson Smart TV'nizi bir Wi-Fi veya LAN kablosu aracılığıyla İnternet'e bağlamanız gerekir.",
        category: "android.tv",
      },
      {
        id: 102,
        question: "Thomson Smart TV'mde hangi tunerler var?",
        answer: "Thomson Smart TV'ler aşağıdaki tunerlere sahiptir: DVB-T2/S2/C.",
        category: "android.tv",
      },
    ],
  },
  {
    id: "internet",
    title: "İnternet ve Bağlantı Sorunları",
    icon: <Wifi className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Internet-ve-Baglanti-Sorunlari.jpg",
    faqs: [
      {
        id: 103,
        question: "Wi-Fi bağlantım sürekli kopuyor. Ne yapabilirim?",
        answer:
          "Bu hata Wi-Fi sinyalinin zayıf olduğunu gösteriyor olabilir. Cihazın yönlendiriciden çok uzakta olmadığından emin olun. Yönlendiriciyi yeniden başlatın ve Thomson cihazınızı elektrik fişinden çekerek sıfırlayın. Gücü tekrar takmadan önce 1 dakika bekleyin. Ayarlar menüsünden Wi-Fi bağlantısını kesip yeniden bağlayın: Ayarlar > Ağ > Ağınızı seçin > Ağı unut",
        category: "android.tv",
      },
    ],
  },
  {
    id: "account",
    title: "Hesap ve Giriş Sorunları",
    icon: <User className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Hesap-ve-Giris-Sorunlari.jpg",
    faqs: [
      {
        id: 104,
        question: "Google hesabımı nereye girebilirim?",
        answer:
          "İlk kurulum sırasında Google hesabınızla oturum açmadıysanız, daha sonra Ayarlar / Hesaplar ve oturum açma menüsünden de oturum açabilirsiniz.",
        category: "android.tv",
      },
      {
        id: 105,
        question: "Şifremi unuttum, ne yapmalıyım?",
        answer:
          "Giriş sayfasında 'Şifremi Unuttum' seçeneğine tıklayarak e-posta adresinize sıfırlama bağlantısı gönderebilirsiniz.",
        category: "android.tv",
      },
    ],
  },
  {
    id: "remote",
    title: "Uzaktan Kumanda Sorunları",
    icon: <Radio className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Uzaktan-Kumanda-Sorunlari.jpg",
    faqs: [
      {
        id: 106,
        question: "Uzaktan kumandamda arka ışığı nasıl açıp kapatabilirim?",
        answer: "OK düğmesine 5 saniye boyunca basarak arka ışığı açıp kapatabilirsiniz.",
        category: "android.tv",
      },
      {
        id: 107,
        question: "Bluetooth uzaktan kumandayı Smart TV ile nasıl eşleştirebilirim?",
        answer:
          "Ayarlar / Uzaktan kumanda ve aksesuarlar / Aksesuar ekle menüsünü açın ve OK düğmesine basın. Ardından, kırmızı LED yanıp sönmeye başlayana kadar uzaktan kumandanızdaki Ses Azaltma (-) düğmesine ve Geri (<) düğmesine aynı anda basın. TV ekranınızın üst kısmında görüntülenen listeden THOMSON RCU'yu seçin ve eşleştirme işlemini başlatmak için OK düğmesine basın. Eşleştirme işlemi tamamlandığında ve uzaktan kumandanız TV ile başarıyla eşleştirildiğinde, bu menüden çıkmak için Çıkış düğmesine basın.",
        category: "android.tv",
      },
    ],
  },
  {
    id: "channel",
    title: "Kanal ve Sinyal Sorunları",
    icon: <Tv className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Ekran-ve-Goruntu-Sorunlari.jpg",
    faqs: [],
  },
  {
    id: "audio_video",
    title: "Ses ve Görüntü Sorunları",
    icon: <Volume2 className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Ses-ve-Goruntu-Sorunlari.jpg",
    faqs: [],
  },
  {
    id: "apps",
    title: "Uygulamalar ve Yazılım",
    icon: <AppWindow className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Uygulamalar-ve-Yazilim.jpg",
    faqs: [
      {
        id: 108,
        question: "Yazılım güncellemesini nasıl yaparım?",
        answer:
          "Thomson Smart TV'niz için yazılım güncellemeleri otomatik olarak gerçekleştirilir. Yüklü uygulamalar için güncellemeler mevcut olduğunda, ana ekranda bir bildirim alırsınız. Bu bildirime gidin ve okumak için Tamam düğmesine basın.",
      },
      {
        id: 109,
        question: "Kullanabileceğim bir internet tarayıcısı var mı?",
        answer: "Evet, ancak Google Play Store'dan bir tarayıcı uygulaması indirmeniz gerekiyor.",
      },
      {
        id: 110,
        question: "Uygulamaları nasıl yükleyebilirim?",
        answer:
          "Google Play'den uygulama indirmek için bir Google Hesabı ile oturum açmış olmanız gerekir. İlk kurulum sırasında bir Google Hesabı girmediyseniz, Thomson Smart TV'nizin ana ekranında Google Play Store uygulamasını ilk kez açtığınızda Google Hesabı oturum açma işlemine yönlendirileceksiniz. Thomson Smart TV'nizin ana ekranında Google Play Store uygulamasını açın, uygulamaları arayın ve istediğiniz uygulamaları indirin.",
      },
      {
        id: 111,
        question: "Seçilen uygulama başlamıyor veya başlaması çok uzun sürüyor. Bu hatayı nasıl düzeltebilirim?",
        answer:
          'Uygulamayı yeniden başlatmak için iptal edin. Bunu yapmak için şuraya gidin: Ayarlar / Uygulamalar / "Uygulama adı" / Durdurmaya zorla. Önbelleği silin: Önbelleğinizi silin. Bu seçeneği şurada bulabilirsiniz: Ayarlar / Uygulamalar / "Uygulama adı" / Önbelleği temizle. Çalışmayan uygulamayı kaldırın. Şuraya gidin: Ayarlar / Uygulamalar / "Uygulama adı" / Kaldır. Kaldırdıktan sonra, uygulamayı Google Play Store\'dan yeniden yükleyin.',
      },
      {
        id: 112,
        question: "Cep telefonuma yüklediğim bazı uygulamalar Google Play Store'da bulunamıyor. Neden böyle oldu?",
        answer:
          "TV seti Android TV ile çalıştırılır. Akıllı telefonlar için Google Play Store, Android TV'ler için olanla aynı değildir. Bazı uygulamalar yalnızca akıllı telefonlar için Google Play Store'da mevcuttur.",
      },
      {
        id: 113,
        question: "Thomson Smart TV'de önceden yüklenmiş uygulamalar var mı?",
        answer:
          "Önceden yüklenmiş uygulamalar arasında Netflix, YouTube, Google Play, Google Movie, Google Music, Google Game ve daha fazlası yer alıyor.",
      },
    ],
  },
  {
    id: "external",
    title: "Harici Cihazlar ve Bağlantılar",
    icon: <Cable className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Harici-Cihazlar-ve-Baglantilar.jpg",
    faqs: [
      {
        id: 114,
        question: "Thomson Smart TV'mdeki girişleri nasıl değiştirebilirim?",
        answer:
          "Uzaktan kumanda üzerindeki SOURCE (KAYNAK) düğmesine basın ve yukarı/aşağı düğmelerini kullanarak istediğiniz girişe geçin.",
      },
    ],
  },
  {
    id: "settings",
    title: "Ayarlar ve Kişiselleştirme",
    icon: <Settings className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Ayarlar-ve-Kisisellestirme.jpg",
    faqs: [],
  },
  {
    id: "power",
    title: "Güç ve Performans",
    icon: <Power className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Guc-ve-Performans.jpg",
    faqs: [],
  },
  {
    id: "parental",
    title: "Ebeveyn Kontrolü ve Kısıtlamalar",
    icon: <ShieldAlert className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Ebeveyn-Kontrolu-ve-Kisitlamalar.jpg",
    faqs: [
      {
        id: 254,
        question: "TV'de çocuklar için kısıtlama modu var mı?",
        answer:
          "Evet, Thomson Android TV'lerde ebeveyn kontrolü özellikleri bulunur. Ayarlar > Kanal > Ebeveyn Kontrolü yolunu izleyerek yaş sınırlaması ayarlayabilirsiniz. Ayrıca, Google Play Store'da uygulama indirme kısıtlamaları için Ayarlar > Ebeveyn Kontrolleri menüsünü kullanabilirsiniz. Belirli uygulamaları PIN koruması altına almak için Ayarlar > Güvenlik ve Kısıtlamalar menüsünü kullanabilirsiniz. Çocuklar için özel bir ortam oluşturmak isterseniz, Google Play Store'dan 'Çocuklar için YouTube' gibi çocuk dostu uygulamalar indirebilirsiniz.",
      },
    ],
  },
  {
    id: "bluetooth",
    title: "Bluetooth ve Kablosuz Bağlantılar",
    icon: <Bluetooth className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Bluetooth-ve-Kablosuz-Baglantilar.jpg",
    faqs: [],
  },
  {
    id: "screen",
    title: "Ekran ve Görüntü Sorunları",
    icon: <MonitorSmartphone className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Ekran-ve-Goruntu-Sorunlari.jpg",
    faqs: [],
  },
  {
    id: "storage",
    title: "Kayıt ve Depolama",
    icon: <HardDrive className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Kayit-ve-Depolama.jpg",
    faqs: [],
  },
  {
    id: "timer",
    title: "Zamanlayıcı ve Otomasyon",
    icon: <Clock className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Zamanlayici-ve-Otomasyon.jpg",
    faqs: [],
  },
  {
    id: "phone",
    title: "Telefonla Kontrol",
    icon: <Smartphone className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Telefonla-Kontrol.jpg",
    faqs: [],
  },
  {
    id: "support",
    title: "Teknik Destek ve Özellikler",
    icon: <HelpCircle className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Teknik-Destek-ve-Ozellikler.jpg",
    faqs: [],
  },
  {
    id: "other",
    title: "Diğer Sorunlar",
    icon: <MoreHorizontal className="h-6 w-6" />,
    image: "http://linkdijital.com.tr/wp-content/uploads/2025/04/Diger-Sorunlar.jpg",
    faqs: [],
  },
]

// Find all faqCategories and update each FAQ item to include the "android.tv" category
// We need to modify each category's faqs array to add the category field

// Remove the following block of code that incorrectly sets all FAQ categories to "android.tv":
// For each category in faqCategories
// faqCategories.forEach((category) => {
//   // For each FAQ in the category
//   if (category.faqs) {
//     category.faqs = category.faqs.map((faq) => ({
//       ...faq,
//       category: "android.tv", // This line is the culprit! It sets ALL to "android.tv"
//     }))
//   }
// })

// Also update the FAQItem component to display a visual indicator for Android TV questions
// Find the FAQItem function and modify it to show the category

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  category,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  category?: string
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 text-left font-primary font-primaryBold text-gray-800 hover:text-primary transition-colors duration-200 group"
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className="group-hover:translate-x-1 transition-transform duration-300">{question}</span>
          {category === "android.tv" && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Android TV
            </span>
          )}
          {category === "google.tv" && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Google TV
            </span>
          )}
          {category === "dreame" && ( // Bu satırı ekleyin
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
              Dreame
            </span>
          )}
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-primary/10 transition-all duration-300 ${isOpen ? "bg-primary/10" : ""}`}
        >
          <ChevronDown
            className={`h-4 w-4 text-gray-500 group-hover:text-primary transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
          />
        </div>
      </button>
      {isOpen && <div className="py-5 text-gray-600 font-text animate-slideDown max-w-3xl">{answer}</div>}
    </div>
  )
}

// I'll update the faqCategories array with the new questions and answers
// First, let's find the setup category and add questions 1-5
const setupCategory = faqCategories.find((c) => c.id === "setup")
if (setupCategory) {
  setupCategory.faqs = [
    ...setupCategory.faqs,
    {
      id: 301,
      question: "TV'mi ilk kez kurarken nelere dikkat etmeliyim?",
      answer:
        "• Televizyonu düz, sağlam bir zemine yerleştirin.\n• TV'yi nemden, doğrudan güneş ışığından ve ısı kaynaklarından uzak tutun.\n• Kurulum sihirbazını izleyin ve gerekli ayarları (dil, ülke, Wi-Fi, Google hesabı vb.) yapın.\n• Duvara monte edilecekse, kılavuzdaki uygun VESA ölçülerine ve talimatlara dikkat edin.",
      category: "android.tv", // Add this line
    },
    {
      id: 302,
      question: "TV'mi mağaza modundan ev moduna nasıl alabilirim?",
      answer:
        '• İlk kurulum sırasında size "Ev" veya "Mağaza" modu sorulur.\n• Ev kullanım için mutlaka "Ev" modunu seçin ve onaylayın.\n• Değiştirmek için fabrika ayarlarına sıfırlayıp yeniden kurulum yapabilirsiniz.',
      category: "android.tv", // Add this line
    },
    {
      id: 303,
      question: "Thomson Android TV'de kaç HDMI girişi bulunur?",
      answer:
        "• Modelden modele değişir; genelde birden fazla HDMI girişi bulunur.\n• En az 2 adet, bazı modellerde 3 veya daha fazla HDMI girişi yer alır.",
      category: "android.tv", // Add this line
    },
    {
      id: 304,
      question: "Televizyonumu duvara monte edebilir miyim?",
      answer:
        "• Evet, TV'niz VESA uyumludur.\n• Kullanım kılavuzunda her inç ölçüsü için uygun vida ve delik bilgileri verilmektedir (örneğin: 43\" için 200x200 mm, M6 vida).",
      category: "android.tv", // Add this line
    },
    {
      id: 305,
      question: "Thomson TV'yi monitör olarak kullanabilir miyim?",
      answer: "• Evet. Bilgisayarınızı HDMI kablosu ile bağlayarak monitör gibi kullanabilirsiniz.",
      category: "android.tv", // Add this line
    },
    {
      id: 401,
      question: "TV'mi ilk kez kurarken nelere dikkat etmeliyim?",
      answer:
        "• TV'nin arkasındaki havalandırmaları kapatmamalı, ısı kaynaklarından uzak yerleştirmelisiniz.\n• Düz, sağlam bir yüzeye yerleştirin.\n• Elektrik bağlantısından önce tüm kurulumları tamamlayın.\n• Kurulum sihirbazını adım adım izleyin.",
      category: "google.tv",
    },
    {
      id: 402,
      question: "TV'mi mağaza modundan ev moduna nasıl alabilirim?",
      answer:
        '• İlk kurulum sırasında TV Modu Seçimi aşamasında "Ev Modu" seçilmelidir. Mağaza modu genellikle demo amaçlıdır.',
      category: "google.tv",
    },
    {
      id: 403,
      question: "Thomson Google TV'de kaç HDMI girişi bulunur?",
      answer:
        "• Modelden modele değişiklik göstermekle birlikte, genelde en az 2-3 adet HDMI girişi mevcuttur. Özellikle HDMI ARC bağlantısı da desteklenir.",
      category: "google.tv",
    },
    {
      id: 404,
      question: "Televizyonumu duvara monte edebilir miyim?",
      answer:
        "• Evet, VESA uyumlu duvar montaj kiti ile mümkündür. Kılavuzda hangi vida ve ölçülerin kullanılacağı ayrıntılı olarak verilmiştir.",
      category: "google.tv",
    },
    {
      id: 405,
      question: "Thomson TV'yi monitör olarak kullanabilir miyim?",
      answer: "• Evet, HDMI bağlantısı ile bilgisayar veya oyun konsolu gibi cihazlar bağlanabilir.",
      category: "google.tv",
    },
  ]
}

// Find the internet category and add questions 6-10
const internetCategory = faqCategories.find((c) => c.id === "internet")
if (internetCategory) {
  internetCategory.faqs = [
    ...internetCategory.faqs,
    {
      id: 306,
      question: "Thomson Android TV'ye nasıl internet bağlantısı kurabilirim?",
      answer:
        "• Wi-Fi veya LAN (Ethernet) bağlantısı kullanabilirsiniz.\n• İlk kurulum sırasında veya Ayarlar > Ağ ve İnternet menüsünden kablosuz ağa bağlanabilirsiniz.",
      category: "android.tv",
    },
    {
      id: 307,
      question: "Chromecast özelliğini nasıl kullanırım?",
      answer:
        '• Dahili Chromecast özelliğini kurulum sırasında açabilirsiniz.\n• Mobil cihazınızdan desteklenen uygulamalarda "Cast" simgesi ile TV\'nize içerik aktarabilirsiniz.',
      category: "android.tv",
    },
    {
      id: 308,
      question: "TV'de ekran yansıtma nasıl yapılır?",
      answer:
        "• Android cihazınızda ekran yansıtma özelliğini açın ve TV'yi seçin.\n• TV ve mobil cihazın aynı Wi-Fi ağına bağlı olması gerekir.",
      category: "android.tv",
    },
    {
      id: 309,
      question: "TV'de ekran yansıtma çalışmıyor, ne yapmalıyım?",
      answer:
        "• Wi-Fi bağlantınızı ve cihazınızın ekran yansıtmayı desteklediğini kontrol edin.\n• TV'nin ve cihazın yazılımını güncelleyin.\n• Gerekirse TV'yi kapatıp tekrar açın.",
      category: "android.tv",
    },
    {
      id: 310,
      question: "TV'yi mobil veri ile internete bağlayabilir miyim?",
      answer:
        "• Mobil cihazınızı Wi-Fi hotspot (taşınabilir erişim noktası) olarak kullanarak TV'yi bağlayabilirsiniz.",
      category: "android.tv",
    },
    // Add Google TV questions with new IDs
    {
      id: 410,
      question: "Thomson Google TV'ye nasıl internet bağlantısı kurabilirim?",
      answer:
        "• Wi-Fi ya da Ethernet (kablo) ile bağlantı kurabilirsiniz. Wi-Fi ağı seçilip şifre girilerek bağlantı sağlanabilir.",
      category: "google.tv",
    },
    {
      id: 411,
      question: "Chromecast özelliğini nasıl kullanırım?",
      answer:
        '• Mobil cihazınızdan "Cast" özelliğini kullanarak içerik paylaşabilirsiniz. TV ve cihaz aynı Wi-Fi ağına bağlı olmalıdır.',
      category: "google.tv",
    },
    {
      id: 412,
      question: "TV'de ekran yansıtma nasıl yapılır?",
      answer: '• Android telefonlarda "Ekran Yayınla" özelliği ile yapılabilir. TV\'de Chromecast aktiftir.',
      category: "google.tv",
    },
    {
      id: 413,
      question: "TV'de ekran yansıtma çalışmıyor, ne yapmalıyım?",
      answer:
        "• TV ve cihaz aynı ağa bağlı mı kontrol edin, Chromecast desteği olup olmadığını kontrol edin. Modem yeniden başlatılması da önerilir.",
      category: "google.tv",
    },
    {
      id: 414,
      question: "TV'yi mobil veri ile internete bağlayabilir miyim?",
      answer: "• Mobil cihazınızı hotspot (kişisel erişim noktası) olarak kullanarak bağlayabilirsiniz.",
      category: "google.tv",
    },
  ]
}

// Find the account category and add questions 11-13
const accountCategory = faqCategories.find((c) => c.id === "account")
if (accountCategory) {
  accountCategory.faqs = [
    ...accountCategory.faqs,
    {
      id: 311,
      question: "Google hesabı girmem zorunlu mu?",
      answer:
        '• Hayır, zorunlu değil. Kurulum sırasında "Atla" seçeneğiyle hesabınızı girmeden devam edebilirsiniz.\n• Ancak Google Play, YouTube, Asistan gibi özellikler için hesap gereklidir.',
      category: "android.tv",
    },
    {
      id: 312,
      question: "Google Asistan neden çalışmıyor?",
      answer:
        "• TV internete bağlı değilse çalışmaz.\n• Mikrofon izinleri verilmemiş olabilir.\n• Asistan dili ve bölge ayarları Google tarafından desteklenmeyen bir dilde olabilir.",
      category: "android.tv",
    },
    {
      id: 313,
      question: "Televizyonu sadece sesli asistanla kontrol edebilir miyim?",
      answer:
        "• Temel komutlar (aç/kapa, ses arttır, uygulama başlat vb.) mümkündür.\n• Ancak tam kontrol için uzaktan kumanda hâlâ gereklidir.",
      category: "android.tv",
    },

    // Add Google TV questions with new IDs
    {
      id: 415,
      question: "Google hesabı girmem zorunlu mu?",
      answer:
        "• Hayır. Temel TV kurulumu ile Google hesabı girmeden de devam edebilirsiniz. Ancak uygulama yüklemek, Google Asistan kullanmak için hesap gereklidir.",
      category: "google.tv",
    },
    {
      id: 416,
      question: "Google Asistan neden çalışmıyor?",
      answer:
        "• TV internete bağlı değilse, mikrofon izni verilmediyse ya da dil desteği olmayan bir bölgede kullanılmaya çalışılıyorsa çalışmayabilir.",
      category: "google.tv",
    },
    {
      id: 417,
      question: "Televizyonu sadece sesli asistanla kontrol edebilir miyim?",
      answer:
        "• Sesli komutlarla aç/kapat, ses ayarı, uygulama başlatma gibi işlemler yapılabilir ancak tam kontrol için kumanda gereklidir.",
      category: "google.tv",
    },
  ]
}

// Find the remote category and add questions 14-17
const remoteCategory = faqCategories.find((c) => c.id === "remote")
if (remoteCategory) {
  remoteCategory.faqs = [
    ...remoteCategory.faqs,
    {
      id: 314,
      question: "Uzaktan kumanda çalışmıyorsa ne yapmalıyım?",
      answer:
        "• Pili doğru taktığınızdan emin olun, pil ömrünü kontrol edin.\n• Gerekirse pilleri değiştirin.\n• TV'ye yakın mesafeden deneyin.\n• TV donmuşsa fişi çıkarıp tekrar takarak yeniden başlatın.",
      category: "android.tv",
    },
    {
      id: 315,
      question: "Bluetooth kumandamı nasıl eşleştirebilirim?",
      answer:
        '• Aynı anda "Geri" + "Ses Azalt" (V–) tuşlarına basın.\n• Kumandada ışık yanıp söner, TV ekranında eşleştirme başlar.',
      category: "android.tv",
    },
    {
      id: 316,
      question: "TV uzaktan kumandasıyla sesli komut verebilir miyim?",
      answer: "• Evet. Kumandada mikrofon varsa Google Asistan tuşuna basarak sesli komut verebilirsiniz.",
      category: "android.tv",
    },
    {
      id: 317,
      question: "Thomson TV kumandasıyla diğer cihazları kontrol edebilir miyim?",
      answer:
        "• Kılavuzda HDMI CEC desteğinden açıkça bahsedilmedi ama çoğu modelde bu özellik bulunur.\n• Ayarlar > HDMI CEC kısmından etkinleştirmeniz gerekebilir.",
      category: "android.tv",
    },
    // Find the remote category and add Google TV questions
    // Look for the remoteCategory section in the code and add the following after the existing Android TV questions

    // Add Google TV questions with new IDs
    // Add these after the existing Android TV remote questions (after ID 317)
    {
      id: 418,
      question: "Uzaktan kumanda çalışmıyorsa ne yapmalıyım?",
      answer: "• Pilleri kontrol edin. Cihazın çalıştığından emin olun. Gerekirse TV'yi yeniden başlatın.",
      category: "google.tv",
    },
    {
      id: 419,
      question: "Bluetooth kumandamı nasıl eşleştirebilirim?",
      answer:
        "• Kumandada BACK + HOME tuşlarına aynı anda basarak eşleştirme moduna geçilir. Ayarlardan manuel eşleştirme de yapılabilir.",
      category: "google.tv",
    },
    {
      id: 420,
      question: "TV uzaktan kumandasıyla sesli komut verebilir miyim?",
      answer: "• Evet. Kumanda üzerindeki mikrofon tuşuna basarak Google Asistan ile sesli kontrol sağlanabilir.",
      category: "google.tv",
    },
    {
      id: 421,
      question: "Thomson TV kumandasıyla diğer cihazları kontrol edebilir miyim?",
      answer:
        "• HDMI-CEC desteği olan modellerde, HDMI ile bağlı cihazlar (örneğin ses sistemleri) kontrol edilebilir.",
      category: "google.tv",
    },
  ]
}

// Find the channel category and add questions 18-24
const channelCategory = faqCategories.find((c) => c.id === "channel")
if (channelCategory) {
  channelCategory.faqs = [
    ...channelCategory.faqs,
    {
      id: 318,
      question: "TV'ye nasıl kanal araması yapabilirim?",
      answer:
        '• İlk kurulum sihirbazında Anten / Kablo / Uydu seçerek kanal taraması yapabilirsiniz.\n• Daha sonra "Canlı TV" uygulamasına girip kanal ayarlarından da manuel arama yapabilirsiniz.',
      category: "android.tv",
    },
    {
      id: 319,
      question: "TV'nin ekranında çift görüntü veya sinyal problemi varsa ne yapmalıyım?",
      answer:
        "• Yüksek binalar veya dağlar sinyal yansıması yaratabilir.\n• Harici anten takılması veya mevcut antenin yönünün değiştirilmesi tavsiye edilir.",
      category: "android.tv",
    },
    {
      id: 320,
      question: 'TV ekranında "sinyal yok" hatası alıyorum, ne yapmalıyım?',
      answer:
        "• Anten kablosunun düzgün bağlı olduğundan emin olun.\n• Kaynak girişinin doğru ayarlandığını kontrol edin.",
      category: "android.tv",
    },
    {
      id: 321,
      question: "Hangi anten türlerini destekliyor?",
      answer:
        "• Karasal (Anten), Kablo ve Uydu antenleri desteklenir.\n• DVB-T2, DVB-C, DVB-S/S2 yayınlarıyla uyumludur.",
      category: "android.tv",
    },
    {
      id: 322,
      question: "Uydu kanallarını manuel olarak ayarlayabilir miyim?",
      answer:
        "• Evet. Uydu tipi, frekans, sembol oranı ve polarizasyon gibi parametreleri manuel olarak ayarlayabilirsiniz.",
      category: "android.tv",
    },
    {
      id: 323,
      question: "Ayarladığım kanallar neden silinmiş?",
      answer:
        '• Yazılım güncellemesi sonrası fabrika ayarlarına dönmüş olabilir.\n• Kanal yönetimi menüsünden "LCN" açıkken yapılan değişiklikler kaybolabilir.',
      category: "android.tv",
    },
    {
      id: 324,
      question: "Thomson TV'mde sinyal kalitesi düşükse ne yapabilirim?",
      answer:
        "• Harici bir anten kullanın ve yönünü değiştirin.\n• Anten kablosu ve bağlantı noktalarını kontrol edin.",
      category: "android.tv",
    },
    // Find the channel category and add Google TV questions
    // Look for the channelCategory section in the code and add the following after the existing Android TV questions

    // Add Google TV questions with new IDs
    // Add these after the existing Android TV channel questions (after ID 324)
    {
      id: 422,
      question: "TV'ye nasıl kanal araması yapabilirim?",
      answer: "• Kurulum sırasında veya Ayarlar > Kanallar menüsünden karasal/kablo/uydu seçilerek arama başlatılır.",
      category: "google.tv",
    },
    {
      id: 423,
      question: "TV'nin ekranında çift görüntü veya sinyal problemi varsa ne yapmalıyım?",
      answer: "• Anten bağlantısını kontrol edin, gerekiyorsa sinyal güçlendirici kullanın.",
      category: "google.tv",
    },
    {
      id: 424,
      question: 'TV ekranında "sinyal yok" hatası alıyorum, ne yapmalıyım?',
      answer: "• Anten kablosu bağlantısını ve doğru kaynak girişini kontrol edin.",
      category: "google.tv",
    },
    {
      id: 425,
      question: "Hangi anten türlerini destekliyor?",
      answer: "• Karasal (DVB-T/T2), kablo (DVB-C) ve uydu (DVB-S/S2) anten türleri desteklenir.",
      category: "google.tv",
    },
    {
      id: 426,
      question: "Uydu kanallarını manuel olarak ayarlayabilir miyim?",
      answer: "• Evet. Uydu kurulumu sırasında frekans, sembol oranı gibi parametreler girilebilir.",
      category: "google.tv",
    },
    {
      id: 427,
      question: "Ayarladığım kanallar neden silinmiş?",
      answer: "• Yazılım güncellemeleri ya da fabrika ayarlarına dönüşle silinmiş olabilir.",
      category: "google.tv",
    },
    {
      id: 428,
      question: "Thomson TV'mde sinyal kalitesi düşükse ne yapabilirim?",
      answer: "• Anteni yeniden yönlendirin, daha güçlü bir anten veya dış anten deneyin.",
      category: "google.tv",
    },
  ]
}

// Find the audio_video category and add questions 25-31
const audioVideoCategory = faqCategories.find((c) => c.id === "audio_video")
if (audioVideoCategory) {
  audioVideoCategory.faqs = [
    ...audioVideoCategory.faqs,
    {
      id: 325,
      question: "TV'de ses var ama görüntü yoksa ne yapmalıyım?",
      answer:
        "• Kontrast ve parlaklık ayarlarını kontrol edin.\n• HDMI kablosunu değiştirin veya başka bir port deneyin.",
      category: "android.tv",
    },
    {
      id: 326,
      question: "TV'de görüntü var ama ses çıkmıyor, ne yapmalıyım?",
      answer: "• Sessiz modda olup olmadığını kontrol edin.\n• Ses seviyesini artırın.\n• Kulaklık takılıysa çıkarın.",
      category: "android.tv",
    },
    {
      id: 327,
      question: "Televizyonumdan ses gelmiyor, ama kulaklıkla ses var. Neden?",
      answer: "• TV ses çıkışı, kulaklığa yönlendirilmiş olabilir. Kulaklığı çıkarınca TV hoparlörlerine geçer.",
      category: "android.tv",
    },
    {
      id: 328,
      question: "Televizyonumda HDMI-ARC desteği var mı?",
      answer: '• Evet. HDMI girişlerinden biri ARC desteklidir (kılavuzda "HDMI (ARC)" olarak belirtilmiş).',
      category: "android.tv",
    },
    {
      id: 329,
      question: "TV'de hangi ses çıkışları mevcut?",
      answer: "• HDMI (ARC), dijital optik ses çıkışı ve kulaklık/AV çıkışı mevcuttur.",
      category: "android.tv",
    },
    {
      id: 330,
      question: "TV kapalıyken ses çıkışı yapabilir mi (Bluetooth veya HDMI ARC)?",
      answer: "• Hayır. TV kapalıyken ses çıkışı yapılmaz. Açık veya en azından bekleme modunda olması gerekir.",
      category: "android.tv",
    },
    {
      id: 331,
      question: "Televizyonumda renkler soluk görünüyor, nasıl düzeltebilirim?",
      answer: "• Ayarlar > Resim menüsünden Parlaklık, Kontrast ve Renk doygunluğu ayarlarını yeniden yapılandırın.",
      category: "android.tv",
    },
    // Add Google TV questions with new IDs
    // Add these after the existing Android TV audio/video questions (after ID 331)
    {
      id: 429,
      question: "TV'de ses var ama görüntü yoksa ne yapmalıyım?",
      answer: "• Görüntü ayarlarını sıfırlayın, HDMI kablosunu kontrol edin.",
      category: "google.tv",
    },
    {
      id: 430,
      question: "TV'de görüntü var ama ses çıkmıyor, ne yapmalıyım?",
      answer: "• Sessiz mod kapalı mı, ses seviyesi açık mı kontrol edin. Hoparlör çıkışı aktif olmalı.",
      category: "google.tv",
    },
    {
      id: 431,
      question: "Televizyonumdan ses gelmiyor ama kulaklıkla ses var. Neden?",
      answer: "• Ses çıkışı otomatik olarak kulaklığa yönelmiş olabilir. Kulaklık çıkarılmalı.",
      category: "google.tv",
    },
    {
      id: 432,
      question: "Televizyonumda HDMI-ARC desteği var mı?",
      answer: "• Evet. ARC destekli HDMI portu mevcuttur.",
      category: "google.tv",
    },
    {
      id: 433,
      question: "TV'de hangi ses çıkışları mevcut?",
      answer: "• HDMI ARC, dijital optik çıkış, kulaklık çıkışı gibi seçenekler sunar.",
      category: "google.tv",
    },
    {
      id: 434,
      question: "TV kapalıyken ses çıkışı yapabilir mi (Bluetooth veya HDMI ARC)?",
      answer: "• Hayır. TV bekleme modunda değilse ses çıkışı veremez.",
      category: "google.tv",
    },
    {
      id: 435,
      question: "Televizyonumda renkler soluk görünüyor, nasıl düzeltebilirim?",
      answer: "• Ayarlar > Görüntü menüsünden renk doygunluğu, parlaklık ve kontrast ayarlanabilir.",
      category: "google.tv",
    },
  ]
}

// Find the apps category and add questions 32-40
const appsCategory = faqCategories.find((c) => c.id === "apps")
if (appsCategory) {
  appsCategory.faqs = [
    ...appsCategory.faqs,
    {
      id: 332,
      question: "Thomson TV'de uygulama nasıl yüklenir?",
      answer: "• Google Play Store'a giriş yaparak uygulama indirebilirsiniz.\n• Google hesabı gerekir.",
      category: "android.tv",
    },
    {
      id: 333,
      question: "TV'min yazılımını nasıl güncelleyebilirim?",
      answer: "• Ayarlar > Hakkında > Sistem Güncellemesi yolunu izleyin.\n• TV internete bağlı olmalıdır.",
      category: "android.tv",
    },
    {
      id: 334,
      question: "Thomson TV ile Netflix, YouTube gibi uygulamaları kullanabilir miyim?",
      answer: "• Evet. Netflix, YouTube, Prime Video gibi uygulamalar TV'de yüklüdür veya indirilebilir.",
      category: "android.tv",
    },
    {
      id: 335,
      question: "Uygulamaları kaldırmak veya sıfırlamak mümkün mü?",
      answer: "• Evet. Ayarlar > Uygulamalar menüsünden uygulamalar silinebilir veya verileri sıfırlanabilir.",
      category: "android.tv",
    },
    {
      id: 336,
      question: "TV yazılımım donuyor ya da yavaşladıysa ne yapmalıyım?",
      answer: "• TV'yi yeniden başlatın.\n• Gerekirse fabrika ayarlarına sıfırlayın.",
      category: "android.tv",
    },
    {
      id: 337,
      question: 'Uygulama yüklerken "yetersiz depolama alanı" hatası alıyorum, ne yapmalıyım?',
      answer: "• Kullanmadığınız uygulamaları silin.\n• Harici USB depolama kullanmayı deneyin.",
      category: "android.tv",
    },
    {
      id: 338,
      question: "Netflix açılmıyor ya da hata veriyor, nasıl düzeltebilirim?",
      answer:
        "• TV'yi yeniden başlatın.\n• Netflix'i güncelleyin ya da verilerini temizleyin.\n• Gerekirse fabrika ayarlarına dönün.",
      category: "android.tv",
    },
    {
      id: 339,
      question: "TV'de Android güncellemeleri geliyor mu?",
      answer: "• Evet. Google destekli Android TV sistem güncellemeleri yapılabilir.",
      category: "android.tv",
    },
    {
      id: 340,
      question: 'Televizyonum "hafıza dolu" hatası veriyor, ne yapmalıyım?',
      answer: "• Ayarlar > Depolama kısmından gereksiz uygulamaları ve verileri silin.",
      category: "android.tv",
    },
  ]
}

// Find the external category and add questions 41-46
const externalCategory = faqCategories.find((c) => c.id === "external")
if (externalCategory) {
  externalCategory.faqs = [
    ...externalCategory.faqs,
    {
      id: 341,
      question: "Thomson TV'ye harici cihazlar (USB, HDMI) nasıl bağlanır?",
      answer:
        "• USB ve HDMI girişlerine uygun cihazları bağlayın.\n• TV cihazı otomatik tanır veya Kaynak menüsünden seçebilirsiniz.",
      category: "android.tv",
    },
    {
      id: 342,
      question: "USB bellekteki video dosyalarını neden oynatamıyorum?",
      answer: "• Desteklenmeyen format olabilir.\n• USB bellek NTFS yerine FAT32 olarak formatlanmalı.",
      category: "android.tv",
    },
    {
      id: 343,
      question: "Televizyonumda hangi formatlar destekleniyor?",
      answer:
        "• AVI, MP4, MKV, MP3 gibi temel medya formatları desteklenir (modelin yazılımına bağlı olarak değişebilir).",
      category: "android.tv",
    },
    {
      id: 344,
      question: "TV'ye oyun kolu bağlayabilir miyim?",
      answer: "• Evet. USB üzerinden veya Bluetooth ile desteklenen gamepad'ler bağlanabilir.",
      category: "android.tv",
    },
    {
      id: 345,
      question: "HDMI CEC desteği var mı?",
      answer: "• Kılavuzda doğrudan belirtilmese de bazı modellerde vardır. Ayarlar > HDMI CEC menüsünü kontrol edin.",
      category: "android.tv",
    },
    {
      id: 346,
      question: "USB belleğim TV'de çalışmıyor, neden olabilir?",
      answer: "• Uyumsuz dosya sistemi (örneğin: exFAT), düşük kaliteli kablo, veya TV portunda sorun olabilir.",
      category: "android.tv",
    },
  ]
}

// Find the settings category and add questions 47-56
const settingsCategory = faqCategories.find((c) => c.id === "settings")
if (settingsCategory) {
  settingsCategory.faqs = [
    ...settingsCategory.faqs,
    {
      id: 347,
      question: "TV'yi fabrika ayarlarına nasıl sıfırlarım?",
      answer: "• Ayarlar > Cihaz Tercihleri > Sıfırla > Fabrika Ayarlarına Dön menüsünden sıfırlayabilirsiniz.",
      category: "android.tv",
    },
    {
      id: 348,
      question: "Thomson TV'nin ekran ışığı çok parlak, nasıl ayarlayabilirim?",
      answer: "• Ayarlar > Resim menüsünden parlaklık, kontrast ve renk ayarlarını düzenleyebilirsiniz.",
      category: "android.tv",
    },
    {
      id: 349,
      question: "TV'de ekran koruyucu nasıl açılır/kapatılır?",
      answer: "• Ayarlar > Cihaz Tercihleri > Ekran Koruyucu bölümünden aktif/pasif yapabilirsiniz.",
      category: "android.tv",
    },
    {
      id: 350,
      question: "Ekrandaki yazıların dili nasıl değiştirilir?",
      answer: "• Ayarlar > Dil menüsünden sistem dilini değiştirebilirsiniz.",
      category: "android.tv",
    },
    {
      id: 351,
      question: "Televizyonumda saat yanlış görünüyor, nasıl düzeltirim?",
      answer: "• Ayarlar > Tarih ve Saat menüsünden saat dilimini ve otomatik saat ayarını kontrol edin.",
      category: "android.tv",
    },
    {
      id: 352,
      question: "Favori uygulamalarımı ana ekrana nasıl ekleyebilirim?",
      answer: '• Ana ekran satırlarında istediğiniz uygulamayı seçin, "+" simgesiyle favori olarak ekleyin.',
      category: "android.tv",
    },
    {
      id: 353,
      question: "TV'de hangi enerji tasarrufu modları bulunur?",
      answer: "• Uyku modu, ekran kapatma, parlaklık düşürme gibi seçenekler mevcut.",
      category: "android.tv",
    },
    {
      id: 354,
      question: "TV'yi açınca otomatik kanal başlatmasını nasıl kapatırım?",
      answer: '• Ayarlar > Cihaz Tercihleri > Başlatma kısmından açılış uygulamasını "Ana Ekran" olarak ayarlayın.',
      category: "android.tv",
    },
    // Find the settings category and add Google TV questions
    // Look for the settingsCategory section in the code and add the following after the existing Android TV questions

    // Add Google TV questions with new IDs
    // Add these after the existing Android TV settings questions (after ID 354)
    {
      id: 451,
      question: "TV'yi fabrika ayarlarına nasıl sıfırlarım?",
      answer: "• Ayarlar > Sistem > Yeniden Başlat veya Fabrika Ayarlarına Dön seçeneği ile sıfırlayabilirsiniz.",
      category: "google.tv",
    },
    {
      id: 452,
      question: "Thomson TV'nin ekran ışığı çok parlak, nasıl ayarlayabilirim?",
      answer: "• Ayarlar > Ekran > Parlaklık ve Kontrast menüsünden ayarları yapabilirsiniz.",
      category: "google.tv",
    },
    {
      id: 453,
      question: "TV'de ekran koruyucu nasıl açılır/kapatılır?",
      answer: "• Ayarlar > Ekran Koruyucu sekmesinden aktif/pasif yapabilirsiniz.",
      category: "google.tv",
    },
    {
      id: 454,
      question: "Ekrandaki yazıların dili nasıl değiştirilir?",
      answer: "• Ayarlar > Dil menüsünden ekran dilini değiştirebilirsiniz.",
      category: "google.tv",
    },
    {
      id: 455,
      question: "Televizyonumda saat yanlış görünüyor, nasıl düzeltirim?",
      answer: "• Ayarlar > Tarih ve Saat menüsünden saat dilimi ve manuel ayarlamalar yapılabilir.",
      category: "google.tv",
    },
    {
      id: 456,
      question: "Favori uygulamalarımı ana ekrana nasıl ekleyebilirim?",
      answer: '• Ana ekranda favori uygulamanızı seçip "Ekle" seçeneği ile kolayca ekleyebilirsiniz.',
      category: "google.tv",
    },
    {
      id: 457,
      question: "TV'de hangi enerji tasarrufu modları bulunur?",
      answer: "• Uyku modu, ekran karartma ve güç tasarrufu modları mevcuttur.",
      category: "google.tv",
    },
    {
      id: 458,
      question: "TV'yi açınca otomatik kanal başlatmasını nasıl kapatırım?",
      answer: "• Ayarlar > TV Başlangıç Seçenekleri > Otomatik Kanal başlatmayı kapatabilirsiniz.",
      category: "google.tv",
    },
  ]
}

// Add remaining questions to their respective categories
// Parental Control
const parentalCategoryIndex = faqCategories.findIndex((c) => c.id === "parental")
const parentalCategory = faqCategories[parentalCategoryIndex]
if (parentalCategory) {
  faqCategories[parentalCategoryIndex].faqs = [
    ...parentalCategory.faqs,
    {
      id: 355,
      question: "TV'de çocuklar için kısıtlama modu var mı?",
      answer: "• Evet. Google Play Ebeveyn Denetimleri ve TV menüsünden kullanılabilir.",
      category: "android.tv",
    },
    {
      id: 459,
      question: "TV'de çocuklar için kısıtlama modu var mı?",
      answer: "• Evet. Ebeveyn kontrolleri ile çocuklar için içerik kısıtlamaları yapılabilir.",
      category: "google.tv",
    },
  ]
}

// Bluetooth
const bluetoothCategory = faqCategories.find((c) => c.id === "bluetooth")
if (bluetoothCategory) {
  bluetoothCategory.faqs = [
    ...bluetoothCategory.faqs,
    {
      id: 356,
      question: "Bluetooth hoparlör bağlayabilir miyim?",
      answer: "• Evet, Bluetooth özelliğiyle kablosuz hoparlör bağlayabilirsiniz.",
      category: "android.tv",
    },
    {
      id: 357,
      question: "TV'ye aynı anda hem Bluetooth kulaklık hem hoparlör bağlayabilir miyim?",
      answer: "• Hayır, Android TV yalnızca tek bir Bluetooth ses cihazını aynı anda destekler.",
      category: "android.tv",
    },
    {
      id: 460,
      question: "Bluetooth hoparlör bağlayabilir miyim?",
      answer: "• Evet, Bluetooth özellikli hoparlörler bağlanabilir.",
      category: "google.tv",
    },
    {
      id: 461,
      question: "TV'ye aynı anda hem Bluetooth kulaklık hem hoparlör bağlayabilir miyim?",
      answer: "• Hayır, bir anda yalnızca tek bir Bluetooth ses cihazı bağlanabilir.",
      category: "google.tv",
    },
  ]
}

// Screen
const screenCategory = faqCategories.find((c) => c.id === "screen")
if (screenCategory) {
  screenCategory.faqs = [
    ...screenCategory.faqs,
    {
      id: 358,
      question: "TV ekranı dönmüyor veya yanıt vermiyor, ne yapmalıyım?",
      answer:
        "• TV'yi kapatıp açın, gerekirse fişini çekip yeniden takın.\n• Son çare olarak fabrika ayarlarına dönebilirsiniz.",
      category: "android.tv",
    },
    {
      id: 359,
      question: "Thomson TV'de ekranı yataydan dikeye çevirebilir miyim?",
      answer: "• Hayır, bu özellik desteklenmez. TV'ler sadece yatay kullanıma uygundur.",
      category: "android.tv",
    },
  ]
}

// Storage
const storageCategory = faqCategories.find((c) => c.id === "storage")
if (storageCategory) {
  storageCategory.faqs = [
    ...storageCategory.faqs,
    {
      id: 360,
      question: "TV'de dahili kayıt (PVR) özelliği nasıl aktif edilir?",
      answer: "• PVR özelliği varsayılan olarak gelmeyebilir. Yazılım güncellemesi veya ücretli bir modül gerekebilir.",
      category: "android.tv",
    },
  ]
}

// Timer
const timerCategory = faqCategories.find((c) => c.id === "timer")
if (timerCategory) {
  timerCategory.faqs = [
    ...timerCategory.faqs,
    {
      id: 361,
      question: "TV'yi açınca otomatik olarak uygulama başlatabilir miyim?",
      answer: "• Ayarlar > Cihaz Tercihleri > Başlatma menüsünden açılışta uygulama başlatma ayarlanabilir.",
      category: "android.tv",
    },
    {
      id: 362,
      question: "Televizyonu otomatik kapanacak şekilde zamanlayabilir miyim?",
      answer: "• Evet. Ayarlar > Zamanlayıcı menüsünden uyku zamanlayıcısı ayarlanabilir.",
      category: "android.tv",
    },
  ]
}

// Phone
const phoneCategory = faqCategories.find((c) => c.id === "phone")
if (phoneCategory) {
  phoneCategory.faqs = [
    ...phoneCategory.faqs,
    {
      id: 363,
      question: "TV'mi telefondan kontrol edebilir miyim?",
      answer: '• Evet. "Android TV Remote Control" veya Google Home uygulaması ile TV\'nizi kontrol edebilirsiniz.',
      category: "android.tv",
    },
  ]
}

// Support
const supportCategory = faqCategories.find((c) => c.id === "support")
if (supportCategory) {
  supportCategory.faqs = [
    ...supportCategory.faqs,
    {
      id: 364,
      question: "TV'nin teknik özelliklerine nereden ulaşabilirim?",
      answer: "• Kılavuzun son bölümünde model bazlı teknik özellik tablosu yer alıyor.",
      category: "android.tv",
    },
    {
      id: 365,
      question: "Thomson Android TV destek hattına nasıl ulaşabilirim?",
      answer: "• www.thomson-brand.com veya tv.mythomson.com adreslerinden destek alınabilir.",
      category: "android.tv",
    },
  ]
}

// Other
const otherCategory = faqCategories.find((c) => c.id === "other")
if (otherCategory) {
  otherCategory.faqs = [
    ...otherCategory.faqs,
    {
      id: 366,
      question: "Ekranda sürekli bildirim görünüyor, nasıl kapatabilirim?",
      answer: "• Ayarlar > Bildirimler menüsünden ilgili uygulamanın bildirimlerini kapatabilirsiniz.",
      category: "android.tv",
    },
    {
      id: 367,
      question: "İnternetsiz kullanımda hangi özellikleri kullanabilirim?",
      answer: "• Canlı TV, HDMI ve USB bağlantısı gibi temel medya oynatıcı işlevleri kullanılabilir.",
      category: "android.tv",
    },
    {
      id: 368,
      question: "TV'yi sesli komutla kapatıyorum ama açılmıyor, neden?",
      answer: "• TV tamamen kapalıysa sesli komutla açılamaz. Bekleme modunda kalmalı.",
      category: "android.tv",
    },
    {
      id: 462,
      question: "Ekranda sürekli bildirim görünüyor, nasıl kapatabilirim?",
      answer: "• Bildirim ayarları kısmında bildirimleri kapatabilirsiniz.",
      category: "google.tv",
    },
    {
      id: 463,
      question: "İnternetsiz kullanımda hangi özellikleri kullanabilirim?",
      answer: "• Canlı TV, USB oynatıcı gibi yerel medya uygulamaları kullanılabilir.",
      category: "google.tv",
    },
    {
      id: 464,
      question: "TV'yi sesli komutla kapatıyorum ama açılmıyor, neden?",
      answer: "• TV tamamen kapalıysa sesli komutla açılamaz, bekleme modunda olmalı.",
      category: "google.tv",
    },
  ]
}

// Find the power category and add questions
const powerCategory = faqCategories.find((c) => c.id === "power")
if (powerCategory) {
  powerCategory.faqs = [
    ...powerCategory.faqs,
    {
      id: 369,
      question: "TV'nin açılış süresi neden uzun sürüyor?",
      answer:
        "• Android TV'ler normal TV'lere göre daha karmaşık işletim sistemine sahiptir ve açılışta daha fazla işlem yapar.\n• Ortalama açılış süresi 30-60 saniye arasındadır.\n• Açılış süresini kısaltmak için bekleme modunu kullanabilirsiniz (tamamen kapatmak yerine).",
      category: "android.tv",
    },
    {
      id: 370,
      question: "Thomson TV televizyonum ne kadar elektrik tüketir?",
      answer:
        '• Elektrik tüketimi modele ve ekran boyutuna göre değişir.\n• 32" modeller ortalama 45-60W, 55" modeller 80-120W, 65" ve üzeri modeller 120-180W civarında tüketim yapar.\n• Enerji tasarrufu modunda tüketim %30\'a kadar azalabilir.\n• Kesin değerler için TV\'nizin enerji etiketi veya kullanım kılavuzuna bakabilirsiniz.',
      category: "android.tv",
    },
    {
      id: 471,
      question: "TV'nin açılış süresi neden uzun sürüyor?",
      answer: "• Yazılım güncellemeleri ve cihazın başlatma süreci nedeniyle açılış süresi uzayabilir.",
      category: "google.tv",
    },
    {
      id: 472,
      question: "Thomson TV televizyonum ne kadar elektrik tüketir?",
      answer: "• Modelin büyüklüğüne göre değişir, genellikle 70W-110W arasında değişebilir.",
      category: "google.tv",
    },
  ]
}

// Find and remove the duplicate question in the faqCategories array
// Look through all categories to find and remove any duplicates

// First, let's check for the specific question containing "Tamamdır Özlem Hanım, teşekkürler"
// If it exists, we'll remove it

// Next, let's check for any other duplicate questions by comparing question text
// For each category, we'll ensure there are no duplicate questions

// For example, in the parental category, there are two questions about TV child restrictions:
// One with ID 254 and one with ID 355 that have similar content

// Remove the duplicate question with ID 355 from the parentalCategory
if (parentalCategory) {
  faqCategories[parentalCategoryIndex].faqs = faqCategories[parentalCategoryIndex].faqs.filter((faq) => faq.id !== 355)
}

// Also check other categories for any duplicates and remove them

// Update the popularSearches with a more logical order
const popularSearches = [
  "Garanti sorgulama",
  "Garanti süresini uzat",
  "Servis randevusu",
  "Arıza bildirimi",
  "Fatura görüntüleme",
  "Şifre sıfırlama",
]

function NavItem({
  href,
  icon,
  children,
  active,
}: { href: string; icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200",
        active ? "bg-primary bg-opacity-10 text-primary" : "text-text hover:bg-gray-50",
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export default function SelfServicePortal() {
  // Add this new state variable with the other state declarations at the beginning of the component
  const [showModelSelection, setShowModelSelection] = useState(false)
  const [selectedTVModel, setSelectedTVModel] = useState<string>("")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Problem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openFaqId, setOpenFaqId] = useState<string | number | null>(null)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Sorun giderme akışı için state'ler
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [solutionHistory, setSolutionHistory] = useState<string[]>([])
  const [showCreateServiceRequest, setShowCreateServiceRequest] = useState(false)

  // Arama önerilerini göstermek için fonksiyon
  const [searchSuggestions, setSearchSuggestions] = useState<{ id: string; question: string }[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // handleSearch fonksiyonundan hemen önce, arama önerilerini yönetmek için yeni bir fonksiyon ekle

  // Arama kutusundaki değişiklikleri ele al
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Arama önerilerini güncelle
    const suggestions = getSearchSuggestions(value)
    setSearchSuggestions(suggestions)
    setShowSuggestions(suggestions.length > 0)
  }

  // Bir öneriyi seçme işlemini ele al
  const handleSuggestionSelect = (id: string, question: string) => {
    setSearchQuery(question)
    setShowSuggestions(false)

    // İlgili problemi bul
    const problem = problemsDatabase.find((p) => p.id === id)
    if (problem) {
      setSearchResults([problem])
    }
  }

  // Arama önerilerini göstermek için fonksiyon
  const getSearchSuggestions = (query: string) => {
    if (!query.trim()) return []

    const lowercasedQuery = query.toLowerCase()

    return problemsDatabase
      .filter((problem) => problem.question.toLowerCase().includes(lowercasedQuery))
      .slice(0, 5) // Maks 5 öneri göster
      .map((problem) => ({
        id: problem.id,
        question: problem.question,
      }))
  }

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowModelSelection(false)
      return
    }

    // Sorun veritabanında arama yap
    const results = problemsDatabase.filter((problem) =>
      problem.question.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (results.length > 0) {
      // Store the results but don't display them yet
      setSearchResults(results)
      // Show the model selection screen instead
      setShowModelSelection(true)
      // Reset other states
      setSelectedProblem(null)
      setCurrentStepIndex(0)
      setSolutionHistory([])
      setShowCreateServiceRequest(false)
    } else {
      // If no results, show the "no results found" message
      setSearchResults([])
      setShowModelSelection(false)
    }
  }

  // Apply model filter after model is selected
  const filterResultsByModel = () => {
    if (!selectedTVModel) return // Do nothing if no model selected

    // If a model is selected, filter the search results accordingly
    const filteredResults = searchResults.filter(
      (problem) => problem.question.includes(selectedTVModel) || problem.category === "thomson", // Keep all thomson category items as fallback
    )

    setSearchResults(filteredResults)
    setShowModelSelection(false) // Hide the model selection, now show the filtered results
  }

  // Sorun seçildiğinde
  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem)
    setCurrentStepIndex(0)
    setSolutionHistory([])
    setShowCreateServiceRequest(false)
  }

  // Çözüm adımı için "Tamamlandı" butonuna tıklandığında
  const handleSolutionCompleted = () => {
    // Sorun çözüldü, teşekkür mesajı göster
    setSelectedProblem(null)
    setSearchResults([])
    setSearchQuery("")
  }

  // Çözüm adımı için "Başka çözüm dene" butonuna tıklandığında
  const handleTryNextSolution = () => {
    if (!selectedProblem) return

    // Mevcut adımı geçmişe ekle
    setSolutionHistory([...solutionHistory, selectedProblem.solutionSteps[currentStepIndex].id])

    // Sonraki adıma geç
    const nextIndex = currentStepIndex + 1

    // Eğer bu son adımsa ve çözüm bulunamadıysa servis talebi oluştur butonunu göster
    if (nextIndex >= selectedProblem.solutionSteps.length) {
      setShowCreateServiceRequest(true)
    } else {
      setCurrentStepIndex(nextIndex)
    }
  }

  // İlgili başka bir soruna geçiş
  const handleRelatedProblem = (problemId: string) => {
    const problem = problemsDatabase.find((p) => p.id === problemId)
    if (problem) {
      setSelectedProblem(problem)
      setCurrentStepIndex(0)
      setSolutionHistory([])
      setShowCreateServiceRequest(false)
    }
  }

  // Toggle FAQ item
  const toggleFaq = (id: string | number | null) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Update the thomsonModels array with the new model names and IDs
  const thomsonModels = [
    { id: "32FA2S13", name: '32" Android Smart Led TV' },
    { id: "32HA2S13W-HD", name: '32" Android Smart Led TV Beyaz' },
    { id: "40FA2S13", name: '40" Android Smart Led TV' },
    { id: "40FG2S14", name: '40" FHD Google TV' },
    { id: "43FG2S14", name: '43" Google Smart Led TV' },
    { id: "50UG4S14", name: '50" Google Smart Led TV' },
    { id: "55OG9C14", name: '55" Lucid OLED TV' },
    { id: "55QG6C14", name: '55" Google QLED Plus TV' },
    { id: "55UG5C14", name: '55" Google UHD TV' },
    { id: "65OG8C14", name: '65" Google OLED TV' },
    { id: "65QG5C14", name: '65" Google OLED TV2' },
    { id: "65UG4S14", name: '65" Google UHD TV Side Feet' },
    { id: "75QG5C14", name: '75" Google TV' },
    { id: "75QG7C14", name: '75" Google QLED Pro TV' },
    { id: "77OG8C14", name: '77" Google OLED TV' },
    { id: "85QG5S14", name: '85" Google QLED TV' },
  ]

  const [showAllFaqs, setShowAllFaqs] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-text">
      {/* Header */}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.agaranti.com.tr/wp-content/uploads/2023/03/AGaranti-Ile-Tanisin.png"
            alt="AGaranti İle Tanışın"
            fill
            className="object-cover brightness-[0.4]"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-primary font-bold mb-6 text-white leading-tight">
              Size Nasıl <span className="text-primary">Yardımcı</span> Olabiliriz?
            </h1>
            <p className="text-lg mb-12 text-white/90 max-w-2xl mx-auto">
              Sorununuz için arama yapın, çözüm bulamazsanız servis talebi oluşturun.
            </p>

            {!showModelSelection ? (
              // Original Search Bar
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Sorunuzu yazın..."
                    className="pl-12 py-7 text-gray-800 font-text rounded-full shadow-xl border-0 focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  <Button
                    className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary/90 text-white rounded-full transition-all hover:shadow-md px-6 py-5"
                    onClick={handleSearch}
                  >
                    Ara
                  </Button>

                  {/* Arama Önerileri Dropdown */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                      <ul className="py-2">
                        {searchSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleSuggestionSelect(suggestion.id, suggestion.question)}
                          >
                            <div className="flex items-center">
                              <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-800 text-sm line-clamp-1">{suggestion.question}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Popular searches */}
                <div className="mt-6 flex flex-wrap justify-center gap-2 hidden">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 font-text rounded-full transition-all"
                      onClick={() => {
                        setSearchQuery(search)
                        handleSearch()
                      }}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              // TV Model Selection
              <div className="relative max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-fadeIn">
                <h3 className="text-xl font-primary font-bold mb-4 text-gray-900">TV Modelinizi Seçin</h3>
                <p className="text-gray-700 mb-4">
                  Size en uygun çözümleri bulabilmemiz için lütfen Thomson TV modelinizi seçin:
                </p>

                <div className="mb-4">
                  <Select value={selectedTVModel} onValueChange={setSelectedTVModel}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="TV modelinizi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {thomsonModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.id} - {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowModelSelection(false)
                      setSearchQuery("")
                    }}
                    className="text-gray-700 border-gray-300"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Geri Dön
                  </Button>

                  <Button
                    onClick={filterResultsByModel}
                    className="bg-primary hover:bg-primary/90 text-white"
                    disabled={!selectedTVModel}
                  >
                    Çözümleri Bul
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-16 -mt-20 relative z-20">
        {/* Interactive Troubleshooting Flow */}
        {searchQuery !== "" && searchResults.length === 0 && !showModelSelection && solutionHistory.length === 0 && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-2xl font-primary font-bold mb-8 text-gray-900 flex items-center">
                <Search className="mr-3 h-5 w-5 text-primary" />
                Arama Sonuçları
              </h2>

              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-primary font-bold mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-600 mb-6">
                  "{searchQuery}" ile ilgili bir sonuç bulamadık. Lütfen farklı anahtar kelimelerle tekrar deneyin veya
                  servis talebi oluşturun.
                </p>
                <Link href="/servis-talebi">
                  <Button className="bg-accent hover:bg-accent/90 text-white font-primary font-primaryBold rounded-full transition-all hover:shadow-lg px-6 py-6">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Servis Talebi Oluştur
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {searchResults.length > 0 && !selectedProblem && !showModelSelection && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-2xl font-primary font-bold mb-8 text-gray-900 flex items-center">
                <Search className="mr-3 h-5 w-5 text-primary" />
                Arama Sonuçları
              </h2>

              <div className="space-y-4">
                {searchResults.map((problem) => (
                  <div key={problem.id} className="border-b border-gray-100 last:border-0">
                    <button
                      className="flex justify-between items-center w-full py-5 text-left font-primary font-primaryBold text-gray-800 hover:text-primary transition-colors duration-200 group"
                      onClick={() => handleSelectProblem(problem)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {problem.question}
                      </span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-primary/10 transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-primary transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* No solution found message */}
              <div className="mt-12 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 mb-4 font-text">Aradığınız sorunu bulamadınız mı?</p>
                <Link href="/servis-talebi">
                  <Button className="bg-accent hover:bg-accent/90 text-white font-primary font-primaryBold rounded-full transition-all hover:shadow-lg px-6 py-6">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Servis Talebi Oluştur
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Selected Problem Solution Steps */}
        {selectedProblem && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-2 mb-8">
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent hover:text-primary transition-colors"
                  onClick={() => setSelectedProblem(null)}
                >
                  <ArrowRight className="h-4 w-4 mr-1 text-primary rotate-180" />
                  <span className="text-primary font-primary">Geri Dön</span>
                </Button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <h2 className="text-2xl font-primary font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 text-primary">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  {selectedProblem.question}
                </h2>
              </div>

              {/* Solution Step */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-primary font-bold text-lg mb-3">Çözüm Adımı {currentStepIndex + 1}</h3>
                    <p className="text-gray-700 mb-6">{selectedProblem.solutionSteps[currentStepIndex].content}</p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        className="bg-accent hover:bg-accent/90 text-white font-primary rounded-full transition-all hover:shadow-md"
                        onClick={handleSolutionCompleted}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Sorun Çözüldü
                      </Button>

                      {!selectedProblem.solutionSteps[currentStepIndex].isLastStep && (
                        <Button
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-100 font-primary rounded-full transition-all bg-transparent"
                          onClick={handleTryNextSolution}
                        >
                          <ArrowRightCircle className="mr-2 h-4 w-4" />
                          Sonraki Adıma Geç
                        </Button>
                      )}

                      {selectedProblem.solutionSteps[currentStepIndex].isLastStep && !showCreateServiceRequest && (
                        <Button
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-100 font-primary rounded-full transition-all bg-transparent"
                          onClick={handleTryNextSolution}
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Sorun Çözülmedi
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Request Button */}
              {showCreateServiceRequest && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8 animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0 mt-1">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-primary font-bold text-lg mb-3">Sorun Çözülemedi</h3>
                      <p className="text-gray-700 mb-6">
                        Önerilen tüm çözüm adımlarını denemenize rağmen sorun devam ediyorsa, teknik destek ekibimizden
                        yardım alabilirsiniz.
                      </p>

                      <Link href="/servis-talebi">
                        <Button className="bg-red-500 hover:bg-red-600 text-white font-primary rounded-full transition-all hover:shadow-md">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Servis Talebi Oluştur
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Problems */}
              {selectedProblem.relatedProblems && selectedProblem.relatedProblems.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-100">
                  <h3 className="font-primary font-bold text-lg mb-4">İlgili Sorunlar</h3>
                  <div className="space-y-2">
                    {selectedProblem.relatedProblems.map((problemId) => {
                      const problem = problemsDatabase.find((p) => p.id === problemId)
                      if (!problem) return null

                      return (
                        <button
                          key={problemId}
                          className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex justify-between items-center"
                          onClick={() => handleRelatedProblem(problemId)}
                        >
                          <span className="font-medium text-gray-800">{problem.question}</span>
                          <ArrowRight className="h-4 w-4 text-gray-500" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Categories Section */}
        {!selectedCategory && searchResults.length === 0 && !selectedProblem && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-primary font-bold mb-12 text-gray-900 text-center">
                Yardım Kategorileri
              </h2>

              {/* Brand Selection */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Thomson Products */}
                <div
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300"
                  onClick={() => {
                    setSelectedBrand("thomson")
                    // Show categories immediately without extra click
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="https://www.agaranti.com.tr/wp-content/uploads/2023/03/AGaranti-Ile-Tanisin.png"
                      alt="Thomson Ürünleri"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-primary font-bold text-white text-2xl mb-2">Thomson Ürünleri</h3>
                      <p className="text-white/80 text-sm">Smart TV, Android TV ve Google TV desteği</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 flex justify-between items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Tv className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center text-primary text-sm font-medium">
                      Kategorileri Görüntüle
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Dreame Products */}
                <div
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300"
                  onClick={() => setSelectedBrand("dreame")}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="https://dreametech.com.tr/cdn/shop/files/about_us_1400x.jpg?v=1750910891"
                      alt="Dreame Ürünleri"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-primary font-bold text-white text-2xl mb-2">Dreame Ürünleri</h3>
                      <p className="text-white/80 text-sm">Robot süpürge, dikey süpürge ve temizlik ürünleri</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 flex justify-between items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Home className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center text-primary text-sm font-medium">
                      Kategorileri Görüntüle
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Brand-Specific Categories - Show immediately when brand is selected */}
        {selectedBrand && !selectedCategory && searchResults.length === 0 && !selectedProblem && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-2 mb-8">
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent hover:text-primary transition-colors"
                  onClick={() => setSelectedBrand(null)}
                >
                  <Home className="h-4 w-4 mr-1 text-primary" />
                  <span className="text-primary font-primary">Marka Seçimi</span>
                </Button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <h2 className="text-2xl font-primary font-bold text-gray-900">
                  {selectedBrand === "thomson" ? "Thomson" : "Dreame"} Yardım Kategorileri
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {faqCategories
                  .filter((category) => {
                    if (selectedBrand === "dreame") {
                      return category.id === "dreame"
                    } else {
                      return category.id !== "dreame"
                    }
                  })
                  .map((category) => (
                    <div
                      key={category.id}
                      className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h3 className="font-primary font-bold text-white text-xl mb-1">{category.title}</h3>
                          <p className="text-white/80 text-sm">{category.faqs.length} soru</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 flex justify-between items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {category.icon}
                        </div>
                        <span className="inline-flex items-center text-primary text-sm font-medium">
                          Görüntüle
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Selected Category FAQs */}
        {selectedCategory && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-2 mb-8">
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent hover:text-primary transition-colors"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedBrand(null)
                  }}
                >
                  <Home className="h-4 w-4 mr-1 text-primary" />
                  <span className="text-primary font-primary">Ana Sayfa</span>
                </Button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent hover:text-primary transition-colors"
                  onClick={() => setSelectedCategory(null)}
                >
                  <span className="text-primary font-primary">
                    {selectedBrand === "thomson" ? "Thomson" : "Dreame"} Kategorileri
                  </span>
                </Button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <h2 className="text-2xl font-primary font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 text-primary">
                    {faqCategories.find((c) => c.id === selectedCategory)?.icon}
                  </div>
                  {faqCategories.find((c) => c.id === selectedCategory)?.title}
                </h2>
              </div>

              <div className="space-y-4">
                {faqCategories
                  .find((c) => c.id === selectedCategory)
                  ?.faqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaqId === faq.id}
                      onClick={() => toggleFaq(faq.id)}
                      category={faq.category}
                    />
                  ))}
              </div>

              {/* No solution found message */}
              <div className="mt-12 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 mb-4 font-text">Aradığınız çözümü bulamadınız mı?</p>
                <Link href="/servis-talebi">
                  <Button className="bg-accent hover:bg-accent/90 text-white font-primary font-primaryBold rounded-full transition-all hover:shadow-lg px-6 py-6">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Servis Talebi Oluştur
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Uzatılmış Garanti Bölümü */}
        {!selectedCategory && searchResults.length === 0 && !selectedProblem && (
          <section className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                    <Shield className="mr-2 h-4 w-4" /> Uzatılmış Garanti
                  </div>
                  <h2 className="text-2xl md:text-3xl font-primary font-bold text-gray-900 mb-4">
                    Ürünleriniz için Uzatılmış Garanti
                  </h2>
                  <p className="text-gray-600 mb-8">
                    AGaranti ile ürünlerinizin standart garanti süresi dolduktan sonra bile güvende olun.
                  </p>
                  <Button className="bg-accent hover:bg-accent/90 text-white font-primary font-primaryBold rounded-full transition-all hover:shadow-lg px-6 py-6 group">
                    <Shield className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    Garanti Paketlerini İncele
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-full">
                    <Image
                      src="https://www.agaranti.com.tr/wp-content/uploads/2023/03/AGaranti-ile-Kendinizi-Garanti-Altina-Alin.png"
                      alt="AGaranti ile Kendinizi Garanti Altina Alin"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent md:bg-gradient-to-r md:from-white/80 md:to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Popular FAQs */}
        {!selectedCategory && searchResults.length === 0 && !selectedProblem && (
          <section id="faq-section" className="animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-primary font-bold mb-8 text-gray-900 text-center">
                Sıkça Sorulan Sorular
              </h2>

              <div className="space-y-4">
                {faqCategories.slice(0, showAllFaqs ? faqCategories.length : 5).map((category) => (
                  <div key={category.id} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(category.id === openFaqId ? null : category.id)}
                      className="flex justify-between items-center w-full p-4 text-left font-primary font-primaryBold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {category.icon}
                        </div>
                        <span>{category.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                          category.id === openFaqId ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {category.id === openFaqId && (
                      <div className="px-4 pb-4 animate-slideDown">
                        <div className="pt-2 border-t border-gray-100">
                          <ul className="space-y-3 mt-3">
                            {category.faqs.map((faq) => (
                              <li key={faq.id} className="text-gray-600 hover:text-primary transition-colors">
                                <button
                                  onClick={() => {
                                    setSelectedCategory(category.id)
                                    setOpenFaqId(faq.id)
                                  }}
                                  className="text-left flex items-center gap-2 w-full"
                                >
                                  <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                                  <span>{faq.question}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Show more/less button */}
              {faqCategories.length > 5 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    {showAllFaqs ? (
                      <>
                        Daha Az Göster
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Devamını Gör
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* View all FAQs button - temporarily hidden */}
              {false && (
                <div className="mt-8 text-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-primary font-primaryBold rounded-full transition-all hover:shadow-lg px-6 py-6 group">
                    Tüm SSS Görüntüle
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Service Form Dialog */}
      <Dialog open={showServiceForm} onOpenChange={setShowServiceForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Servis Talebi Oluştur</DialogTitle>
            <DialogDescription>
              Lütfen sorununuzu detaylı bir şekilde açıklayın, size en kısa sürede yardımcı olacağız.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right font-medium">
                Ad Soyad
              </label>
              <Input id="name" value="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right font-medium">
                E-posta
              </label>
              <Input id="email" value="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right font-medium">
                Kategori
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Bir kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Teknik Destek</SelectItem>
                  <SelectItem value="payment">Ödeme ve Fatura</SelectItem>
                  <SelectItem value="account">Hesap İşlemleri</SelectItem>
                  <SelectItem value="products">Ürün ve Servis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right font-medium">
                Açıklama
              </label>
              <Textarea id="description" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Gönder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition-colors z-10 focus:outline-none"
        >
          <ArrowUpRight className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
