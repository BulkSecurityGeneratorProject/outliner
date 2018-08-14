package outliner.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import outliner.domain.L1;
import outliner.repository.L1Repository;
import outliner.repository.search.L1SearchRepository;
import outliner.web.rest.errors.BadRequestAlertException;
import outliner.web.rest.util.HeaderUtil;

/**
 * REST controller for managing L1.
 */
@RestController
@RequestMapping("/api")
public class L1Resource {



    private final Logger log = LoggerFactory.getLogger(L1Resource.class);

    private static final String ENTITY_NAME = "l1";

    private final L1Repository l1Repository;

    private final L1SearchRepository l1SearchRepository;

    public L1Resource(L1Repository l1Repository, L1SearchRepository l1SearchRepository) {
        this.l1Repository = l1Repository;
        this.l1SearchRepository = l1SearchRepository;
    }

    /**
     * POST  /l-1-s : Create a new l1.
     *
     * @param l1 the l1 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new l1, or with status 400 (Bad Request) if the l1 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/l-1-s")
    @Timed
    public ResponseEntity<L1> createL1(@Valid @RequestBody L1 l1) throws URISyntaxException {
        log.debug("REST request to save L1 : {}", l1);
        if (l1.getId() != null) {
            throw new BadRequestAlertException("A new l1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        L1 result = l1Repository.saveAndFlush(l1);
        //EntityManager flush should be called here
        l1SearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/l-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /l-1-s : Updates an existing l1.
     *
     * @param l1 the l1 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated l1,
     * or with status 400 (Bad Request) if the l1 is not valid,
     * or with status 500 (Internal Server Error) if the l1 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/l-1-s")
    @Timed
    public ResponseEntity<L1> updateL1(@Valid @RequestBody L1 l1) throws URISyntaxException {
        log.debug("REST request to update L1 : {}", l1);
        if (l1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        L1 result = l1Repository.saveAndFlush(l1);
        l1SearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, l1.getId().toString()))
            .body(result);
    }

    /**
     * GET  /l-1-s : get all the l1S.
     * 
     *
     * @return the ResponseEntity with status 200 (OK) and the list of l1S in body
     */
    @GetMapping("/l-1-s")
    @Timed
    public List<L1> getAllL1S() {
        log.debug("REST request to get all L1S");
        List<L1> list = (List<L1>) l1Repository.findAll();
        return list;
    }

    /**
     * GET  /l-1-s/:id : get the "id" l1.
     *
     * @param id the id of the l1 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the l1, or with status 404 (Not Found)
     */
    @GetMapping("/l-1-s/{id}")
    @Timed
    public ResponseEntity<L1> getL1(@PathVariable Long id) {
        log.debug("REST request to get L1 : {}", id);
        Optional<L1> l1 = l1Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(l1);
    }

    /**
     * DELETE  /l-1-s/:id : delete the "id" l1.
     *
     * @param id the id of the l1 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/l-1-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteL1(@PathVariable Long id) {
        log.debug("REST request to delete L1 : {}", id);

        l1Repository.deleteById(id);
        l1SearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/l-1-s?query=:query : search for the l1 corresponding
     * to the query.
     *
     * @param query the query of the l1 search
     * @return the result of the search
     */
    @GetMapping("/_search/l-1-s")
    @Timed
    public List<L1> searchL1S(@RequestParam String query) {
        log.debug("REST request to search L1S for query {}", query);
        return StreamSupport
            .stream(l1SearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
