import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TermsService} from "../../../services/terms.service";


@Component({
    selector: 'terms-modal-component',
    template: `
      <h4 mat-dialog-title>Terms and Conditions ("Terms")</h4>
    
      <mat-dialog-content>
				<p>Last updated: April 09, 2019</p>

				<p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Bboxes.io
					website (the "Service") operated by Bboxes ("us", "we", or "our").</p>

				<p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These
					Terms apply to all visitors, users and others who access or use the Service.</p>

				<p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
					terms then you may not access the Service. The Terms and Conditions agreement for Bboxes has been created with the
					help of <a href="https://termsfeed.com/terms-conditions/generator/">TermsFeed Terms and Conditions Generator</a>.
				</p>

				<h4>Accounts</h4>

				<p>When you create an account with us, you must provide us information that is accurate, complete, and current at
					all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your
					account on our Service.</p>

				<p>You are responsible for safeguarding the password that you use to access the Service and for any activities or
					actions under your password, whether your password is with our Service or a third-party service.</p>

				<p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of
					any breach of security or unauthorized use of your account.</p>

				<h4>Links To Other Web Sites</h4>

				<p>Our Service may contain links to third-party web sites or services that are not owned or controlled by
					Bboxes.</p>

				<p>Bboxes has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any
					third party web sites or services. You further acknowledge and agree that Bboxes shall not be responsible or
					liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use
					of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

				<p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or
					services that you visit.</p>
				<h4>Governing Law</h4>

				<p>These Terms shall be governed and construed in accordance with the laws of Ukraine, without regard to its
					conflict of law provisions.</p>

				<p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If
					any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these
					Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and
					supersede and replace any prior agreements we might have between us regarding the Service.</p>

				<h4>Changes</h4>

				<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
					material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a
					material change will be determined at our sole discretion.</p>

				<p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
					revised terms. If you do not agree to the new terms, please stop using the Service.</p>

				<h4>Contact Us</h4>

				<p>If you have any questions about these Terms, please contact us.</p>
      </mat-dialog-content>
    <mat-dialog-actions>
        <button mat-flat-button (click)="close()">Disagree</button>
        <button mat-flat-button  class="mat-primary "(click)="applyTerms()">Apply</button>
    </mat-dialog-actions>
    `
})
export class TermsModalComponent {
    description: string
    constructor (
        private termsService: TermsService,
        private dialogRef: MatDialogRef<TermsModalComponent>,
        @Inject(MAT_DIALOG_DATA) data) {}

    applyTerms () {
        this.termsService.termsState.next(true);
        this.close();
    }
    disagreeTerms () {
        this.termsService.termsState.next(false);
        this.close();
    }

    close() {
        this.dialogRef.close();
    }


}
